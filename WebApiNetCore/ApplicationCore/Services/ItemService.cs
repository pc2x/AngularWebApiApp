using WebApiNetCore2023.ApplicationCore.Core.Models;
using WebApiNetCore2023.ApplicationCore.Core.RepositoriesContracts;
using WebApiNetCore2023.ApplicationCore.Core.ServicesContracts;

namespace WebApiNetCore2023.ApplicationCore.Services
{
    public class ItemService : IItemService
    {
        private readonly IItemRepository _repository;

        public ItemService(IItemRepository repository)
        {
            _repository = repository;
        }

        public Task<int> Add(ItemModel model)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<int>> BulkInsert(IEnumerable<ItemModel> list)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Delete(ItemModel model)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ItemModel>> GetAll()
        {
            return _repository.GetAll();
        }

        public Task<ItemModel> GetById(int Id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Update(ItemModel model)
        {
            throw new NotImplementedException();
        }
    }
}
