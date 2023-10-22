using RestaurantApi.Data.SQLServer;
using WebApiNetCore2023.ApplicationCore.Core.RepositoriesContracts;
using WebApiNetCore2023.ApplicationCore.Core.ServicesContracts;
using WebApiNetCore2023.ApplicationCore.Repositories.SQLServer;
using WebApiNetCore2023.ApplicationCore.Services;

namespace WebApiNetCore2023
{
    public static class DependencyInjection
    {
        public static void AddDomainServices(IServiceCollection services, string connectionString)
        {
            //add sql server db context
            services.AddTransient<IDbContext>(s => new SqlServerDbContext(connectionString));

            //heroes
            services.AddTransient<IHeroRepository, HeroRepository>();
            services.AddTransient<IHeroService, HeroService>();
        }
    }
}
