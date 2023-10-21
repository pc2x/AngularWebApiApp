namespace WebApiNetCore2023.ApplicationCore.Core.ServicesContracts
{
    public interface IGenericService<TModel,TKey>
    {
        Task<TKey> Add(TModel model);
        Task<bool> Update(TModel model);
        Task<bool> Delete(TModel model);
        Task<TModel> GetById(TKey Id);
        Task<IEnumerable<TModel>> GetAll();
        Task<IEnumerable<TKey>> BulkInsert(IEnumerable<TModel> list);
    }
}