using WebApiNetCore2023.ApplicationCore.Core.Models;
using WebApiNetCore2023.ApplicationCore.Core.RepositoriesContracts;
using WebApiNetCore2023.ApplicationCore.Core.ServicesContracts;

namespace WebApiNetCore2023.ApplicationCore.Services
{
    public class HeroService : IHeroService
    {
        private readonly IHeroRepository _repository;

        public HeroService(IHeroRepository repository)
        {
            _repository = repository;
        }

        public Task<int?> Add(HeroModel model)
        {
            return _repository.Add(model);
        }

        public Task<IEnumerable<int?>> BulkInsert(IEnumerable<HeroModel> list)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Delete(HeroModel model)
        {
            return _repository.Delete(model);
        }

        public Task<IEnumerable<HeroModel>> GetAll(string? name)
        {
            if(string.IsNullOrWhiteSpace(name))
                return _repository.GetAll();
            else
                return _repository.GetAll(name);
        }

        public Task<IEnumerable<HeroModel>> GetAll()
        {
            return _repository.GetAll();
        }

        public Task<HeroModel> GetById(int? Id)
        {
            return _repository.GetById(Id);
        }

        public Task<bool> Update(HeroModel model)
        {
            return _repository.Update(model);
        }
    }
}
