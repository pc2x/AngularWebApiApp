using WebApiNetCore2023.ApplicationCore.Core.Models;
using WebApiNetCore2023.ApplicationCore.Core.RepositoriesContracts;

namespace WebApiNetCore2023.ApplicationCore.Repositories.SQLServer
{
    public class HeroRepository : IHeroRepository
    {
        private readonly IDbContext _dbContext;

        public HeroRepository(IDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<int?> Add(HeroModel model)
        {
            if (model == null || string.IsNullOrWhiteSpace(model.Name))
                return -1;

            return await _dbContext.GetScalarAsync<int>("insert into [dbo].heroes(name)values(@p1); select SCOPE_IDENTITY()", model.Name);
        }

        public Task<IEnumerable<int?>> BulkInsert(IEnumerable<HeroModel> list)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> Delete(HeroModel model)
        {
            if (model == null || model.Id == null)
                return false;

            await _dbContext.GetScalarStringAsync("delete from heroes where id = @p1", model.Id);
            return true;
        }

        public Task<IEnumerable<HeroModel>> GetAll()
        {
            return _dbContext.GetListAsync<HeroModel>("select * from Heroes");
        }

        public Task<IEnumerable<HeroModel>> GetAll(string name)
        {
            return _dbContext.GetListAsync<HeroModel>("select * from Heroes where name like @p1", "%" + name + "%");
        }

        public Task<HeroModel> GetById(int? Id)
        {
            Id ??= 0;
            return _dbContext.GetModelAsync<HeroModel>("select * from Heroes where id = @p1", Id);
        }

        public async Task<bool> Update(HeroModel model)
        {
            if (model == null || model.Id == null || string.IsNullOrWhiteSpace(model.Name))
                return false;

            await _dbContext.GetStringAsync("update heroes set name = @p1 where id = @p2", model.Name, model.Id);
            return true;
        }
    }
}
