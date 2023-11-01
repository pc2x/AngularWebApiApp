using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WebApiNetCore2023.Logger;
using WebApiNetCore2023;
using WebApiNetCore2023.Models.Identity;
using Microsoft.AspNetCore.Mvc.Controllers;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddLogging(builder =>
{
    builder.AddProvider(new FileLoggerProvider(ENV_VARS.LogsPath, LogLevel.Warning));
});

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//configura la cadena de conexión
//obtiene la cadena de conexión desde una variable de entorno
var connectionString = ENV_VARS.ConnectionString;
if (string.IsNullOrWhiteSpace(connectionString))
{
    //Si no está la variable de entorno utiliza la cadena de conexión del appSettings
    connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
}
//Add las dependencias de los servicios del dominio de la aplicación
DependencyInjection.AddDomainServices(builder.Services, connectionString);

//Add servicio de DbContext para usarlo con EF
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(connectionString);
});

//Add Identity (autenticación) tiene que ir antes de jwt para que no haya problemas de 404 al acceder a un recurso restringido
builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
{
    options.Password.RequiredLength = 6;

}).AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders();

//Add servicio de jwt (autorización)
JwtConfiguration.AddJwtService(builder.Services);

//permite definir politicas personalizadas de autorización a recursos
//como que un usuario especifico tenga acceso a un registro especifico
builder.Services.AddAuthorization();

//Add el servicio ante ataques CSRF
builder.Services.AddAntiforgery(options =>
{
    options.HeaderName = ENV_VARS.AntiforgeryTokenName;
    options.SuppressXFrameOptionsHeader = false;
    options.Cookie.HttpOnly = false;
    options.Cookie.Name = ENV_VARS.AntiforgeryCookieName;
    options.Cookie.SameSite = SameSiteMode.None;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
});

var app = builder.Build();

// Obtener una instancia de ILogger
var logger = app.Services.GetRequiredService<ILogger<Program>>();

logger.LogWarning("Directorio de logs:" + ENV_VARS.LogDirectory);

app.UseSwagger();
app.UseSwaggerUI();

//configuración de CORS
app.UseCors(builder =>
{
    builder.WithOrigins("http://localhost:4100", "https://localhost:4200", "http://localhost:4200")
           .AllowAnyHeader()
           .AllowAnyMethod()
           .WithExposedHeaders("RequestVerificationToken")
           .AllowCredentials();
    //Access-Control-Allow-Credentials
    //.AllowAnyOrigin(); risk
});

// Validación del token Antiforgery
app.Use(async (context, next) =>
{
    var endPoint = context.GetEndpoint();
    if (endPoint != null && context.Request.Path != "/oauth/token" &&
            (context.Request.Method == HttpMethods.Post ||
            context.Request.Method == HttpMethods.Put ||
            context.Request.Method == HttpMethods.Delete))
    {
        // Verifica si la acción tiene el atributo IgnoreAntiforgeryTokenAttribute para ignorarlo
        var actionDescriptor = endPoint.Metadata.GetMetadata<ControllerActionDescriptor>();
        if (actionDescriptor != null && actionDescriptor.MethodInfo.IsDefined(typeof(Microsoft.AspNetCore.Mvc.IgnoreAntiforgeryTokenAttribute), inherit: true))
        {
            // No validamos el token Antiforgery
            await next(context);
            return;
        }

        // Validar el token Antiforgery en las solicitudes POST o PUT
        var antiforgery = context.RequestServices.GetRequiredService<IAntiforgery>();
        try
        {
            await antiforgery.ValidateRequestAsync(context);
        }
        catch (Exception ex)
        {
            logger.LogWarning(ex, "Error de validación del token Antiforgery");
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            await context.Response.WriteAsync("Error de validación del token Antiforgery");
            return;
        }
    }
    await next(context);
});

app.UseHttpsRedirection();

//Enable OAuth2 authentication
//debe ir antes de UseAuthorization
app.UseAuthentication();

//aplica las politicas de autorización configuradas anteriormente
//permite utilizar el decorador authorize
app.UseAuthorization();

app.MapControllers();

//configura la respuesta para enviar el AntifolgeryToken
app.Use(async (context, next) =>
{
    // Obtener el servicio de Antiforgery
    var antiforgery = context.RequestServices.GetRequiredService<IAntiforgery>();

    // Generar un token CSRF y genera la cookie
    var tokens = antiforgery.GetAndStoreTokens(context);

    //add el token en la cabecera del response
    if (tokens != null && tokens.RequestToken != null)
    {
        context.Response.Headers.Append(ENV_VARS.AntiforgeryTokenName, tokens.RequestToken);
        //context.Response.Headers.SetCookie = ENV_VARS.AntiforgeryCookieName;
    }

    await next(context);
});

//aplica las migraciones pendientes
if (AppDbInitializer.ApplyPendingMigrationsIfAny(app))
{
    //crea el usuario administrador en caso de no existir en la db
    await AppDbInitializer.CreateAdminUserIfNotExist(app, ENV_VARS.AdminUser, ENV_VARS.AdminPass, ENV_VARS.AdminEmail);
}

app.Run();