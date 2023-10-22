using WebApiNetCore2023.ApplicationCore.Core.Models;

namespace WebApiNetCore2023.ApplicationCore.Core.ServicesContracts
{
    public interface IHeroService : IGenericService<HeroModel, int?>
    {
        Task<IEnumerable<HeroModel>> GetAll(string name);
    }
}
