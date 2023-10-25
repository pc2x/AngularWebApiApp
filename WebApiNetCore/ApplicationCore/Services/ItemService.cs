using WebApiNetCore2023.ApplicationCore.Core.Models;
using WebApiNetCore2023.ApplicationCore.Core.RepositoriesContracts;
using WebApiNetCore2023.ApplicationCore.Core.ServicesContracts;

namespace WebApiNetCore2023.ApplicationCore.Services
{
    public class ItemService : ItemService
    {
        private readonly IItemRepository _repository;

        public ItemService(IItemRepository repository)
        {
            _repository = repository;
        }

        public Task<string> Add(LocationModel model)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Update(LocationModel model)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Delete(LocationModel model)
        {
            throw new NotImplementedException();
        }

        public Task<LocationModel> GetById(string Id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<LocationModel>> GetAll()
        {
            return _repository.GetAll();
        }

        public Task<IEnumerable<string>> BulkInsert(IEnumerable<LocationModel> list)
        {
            throw new NotImplementedException();
        }
    }
}
