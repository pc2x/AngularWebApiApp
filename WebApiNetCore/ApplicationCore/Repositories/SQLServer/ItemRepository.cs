using WebApiNetCore2023.ApplicationCore.Core.Models;
using WebApiNetCore2023.ApplicationCore.Core.RepositoriesContracts;

namespace RestaurantApi.Data.SQLServer
{
    public class ItemRepository : ItemRepository
    {
        private readonly IDbContext _dbContext;

        public ItemRepository(IDbContext dbContext)
        {
            _dbContext = dbContext;
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
            return _dbContext.GetListAsync<LocationModel>("select * from locations");
        }

        public Task<IEnumerable<string>> BulkInsert(IEnumerable<LocationModel> list)
        {
            throw new NotImplementedException();
        }
    }
}
