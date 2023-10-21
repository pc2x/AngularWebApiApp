using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WebApiNetCore2023.Models.Identity;

namespace WebApiNetCore2023
{
    public class AppDbInitializer
    {
        public static bool ApplyPendingMigrationsIfAny(WebApplication app)
        {
            //inicializa las migraciones en la db
            using (var scope = app.Services.CreateScope())
            {
                var logger = scope.ServiceProvider.GetRequiredService<ILogger<AppDbInitializer>>();
                var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

                try
                {
                    //si no puede conectar a la db
                    if (!context.Database.CanConnect())
                    {
                        if (context.Database.GetPendingMigrations().Any())
                        {
                            context.Database.Migrate();
                        }
                    }

                    return true;
                }
                catch (Exception ex)
                {
                    logger.LogCritical(ex, "Error al generar las migraciones con EF");
                    return false;
                }
            }
        }

        public static async Task CreateAdminUserIfNotExist(WebApplication app, string adminUser, string adminPass, string adminEmail)
        {
            using (var scope = app.Services.CreateScope())
            {
                var logger = scope.ServiceProvider.GetRequiredService<ILogger<AppDbInitializer>>();
                try
                {
                    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();
                    var user = await userManager.FindByNameAsync(adminUser);
                    if (user == null)
                    {
                        var newUser = new IdentityUser
                        {
                            UserName = adminUser,
                            Email = adminEmail,
                        };
                        await userManager.CreateAsync(newUser, adminPass);
                    }
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, "Error al generar el usuario inicial", new
                    {
                        adminUser,
                        adminPass,
                        adminEmail
                    });
                }
            }
        }
    }
}
