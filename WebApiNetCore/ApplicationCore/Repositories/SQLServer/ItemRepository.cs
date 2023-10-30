using WebApiNetCore2023.ApplicationCore.Core.Models;
using WebApiNetCore2023.ApplicationCore.Core.RepositoriesContracts;

namespace RestaurantApi.Data.SQLServer
{
    public class ItemRepository : IItemRepository
    {
        private readonly IDbContext _dbContext;

        public ItemRepository(IDbContext dbContext)
        {
            _dbContext = dbContext;
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
            return _dbContext.GetListAsync<ItemModel>("select * from items");
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
