using WebApiNetCore2023.ApplicationCore.Core.Models;

namespace WebApiNetCore2023.ApplicationCore.Core.RepositoriesContracts
{
    public interface IHeroRepository : IGenericRepository<HeroModel, int?>
    {
        Task<IEnumerable<HeroModel>> GetAll(string name);
    }
}
