using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;

namespace WebApiNetCore2023
{
    public static class JwtConfiguration
    {
        public static void AddJwtService(IServiceCollection services)
        {
            //Add servicio de autenticación con jwt
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = ENV_VARS.Jwt_Issuer,
                        ValidAudience = ENV_VARS.Jwt_Audience,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(ENV_VARS.Jwt_Key))
                    };

                    //options.Events = new JwtBearerEvents
                    //{
                    //    OnTokenValidated = context =>
                    //    {
                    //        if (context != null && context.Principal != null)
                    //        {
                    //            if (!context.Principal.HasClaim(claim => claim.Type == "authentication_method" && claim.Value == "ROPC"))
                    //            {
                    //                // Si la claim no está presente o su valor no es el esperado, rechaza el token
                    //                context.Fail("Authentication method is not valid.");
                    //            }
                    //            else if (context != null && context.Principal != null && context.Principal.Identity != null)
                    //            {
                    //                // Agrega la claim personalizada al principal del usuario
                    //                var claimsIdentity = (ClaimsIdentity)context.Principal.Identity;
                    //                var claim = context.Principal.Claims.FirstOrDefault(claim => claim.Type == "username");
                    //                if (claim != null)
                    //                    claimsIdentity.AddClaim(new Claim("username", claim.Value));
                    //            }
                    //        }

                    //        return Task.CompletedTask;
                    //    }
                    //};

                    //en caso de error al validar el token, para enviar un mensaje personalizado
                    //options.Events = new JwtBearerEvents
                    //{
                    //    OnChallenge = context =>
                    //    {
                    //        // Personaliza el mensaje de respuesta de autenticaci�n no v�lida
                    //        context.Response.StatusCode = 401;
                    //        context.HandleResponse();
                    //        context.Response.Headers.Add("www-authenticate", "Bearer error=\"invalid_token\"");
                    //        return context.Response.WriteAsync($"{{ \"message\": error al validar el token de acceso al recurso }}");
                    //    }
                    //};

                });
        }
    }
}
