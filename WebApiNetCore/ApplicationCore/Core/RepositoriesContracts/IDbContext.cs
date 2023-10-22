namespace WebApiNetCore2023.ApplicationCore.Core.RepositoriesContracts
{
    public interface IDbContext 
    {
        Task<string> GetStringAsync(string query, params object[] parametros);
        Task<TModel> GetModelAsync<TModel>(string query, params object[] parametros) where TModel : class;
        Task<IEnumerable<TModel>> GetListAsync<TModel> (string query, params object[] parametros) where TModel : class;
        Task<string?> GetScalarStringAsync(string query, params object[] parametros);
        Task<TResult> GetScalarAsync<TResult>(string query, params object[] parametros) where TResult : struct;
    }
}
