using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json;
using WebApiNetCore2023.ApplicationCore.Core.RepositoriesContracts;

namespace RestaurantApi.Data.SQLServer
{
    public class SqlServerDbContext : IDbContext, IDisposable
    {
        private readonly SqlConnection _conexion;

        public SqlServerDbContext(string connectionString)
        {
            _conexion = new SqlConnection(connectionString);
        }

        public void Dispose()
        {
            if (_conexion != null)
            {
                if (_conexion.State != ConnectionState.Closed)
                {
                    _conexion.Close();
                    _conexion.Dispose();
                }
            }
        }

        public async Task<string> GetStringAsync(string query, params object[] parametros)
        {
            SqlCommand? cmd = null;

            try
            {
                cmd = _conexion.CreateCommand();
                cmd.CommandText = query;
                cmd.CommandTimeout = 300;

                for (var i = 0; i < parametros.Length; i++)
                {
                    //obtiene el valor del parametro
                    var value = parametros[i];

                    //crea el parametro
                    var param = cmd.CreateParameter();
                    param.Direction = System.Data.ParameterDirection.Input;

                    //nombre del parámetro
                    param.ParameterName = string.Format("@p{0}", i + 1);

                    //valor del parámetro
                    param.Value = value == null ? (object)DBNull.Value : value;

                    cmd.Parameters.Add(param);
                }

                await cmd.Connection.OpenAsync();

                var dt = new DataTable();
                using (var reader = await cmd.ExecuteReaderAsync(CommandBehavior.CloseConnection))
                {
                    dt.Load(reader);
                }

                return JsonConvert.SerializeObject(dt);
            }
            catch 
            {
                throw;
            }
            finally
            {
                if (cmd != null && cmd.Connection.State != ConnectionState.Closed)
                {
                    await cmd.Connection.CloseAsync();
                }
            }
        }

        public async Task<string?> GetScalarStringAsync(string query, params object[] parametros)
        {
            SqlCommand? cmd = null;
            try
            {
                cmd = _conexion.CreateCommand();
                cmd.CommandText = query;
                cmd.CommandTimeout = 300;

                for (var i = 0; i < parametros.Length; i++)
                {
                    //obtiene el valor del parametro
                    var value = parametros[i];

                    //crea el parametro
                    var param = cmd.CreateParameter();
                    param.Direction = System.Data.ParameterDirection.Input;

                    //nombre del parámetro
                    param.ParameterName = string.Format("@p{0}", i + 1);

                    //valor del parámetro
                    param.Value = value == null ? (object)DBNull.Value : value;

                    cmd.Parameters.Add(param);
                }

                await cmd.Connection.OpenAsync();
                var resultObj = await cmd.ExecuteScalarAsync();
                return resultObj != null ? resultObj.ToString() : null;
            }
            catch
            {
                throw;
            }
            finally
            {
                if (cmd != null && cmd.Connection.State != ConnectionState.Closed)
                {
                    await cmd.Connection.CloseAsync();
                }
            }
        }

        public async Task<IEnumerable<TModel>> GetListAsync<TModel>(string query, params object[] parametros) where TModel : class
        {
            var jsonString = await GetStringAsync(query, parametros);
            if (string.IsNullOrEmpty(jsonString))
                return default(IEnumerable<TModel>);

            return JsonConvert.DeserializeObject<IEnumerable<TModel>>(jsonString);
        }
       
        public async Task<TResult> GetScalarAsync<TResult>(string query, params object[] parametros) where TResult : struct
        {
            var jsonString = await GetScalarStringAsync(query, parametros);
            if (string.IsNullOrEmpty(jsonString))
                return default(TResult);
            
            return (TResult)Convert.ChangeType(jsonString, typeof(TResult));
        }

        public async Task<TModel> GetModelAsync<TModel>(string query, params object[] parametros) where TModel : class
        {
            var jsonString = await GetStringAsync(query, parametros);
            if (string.IsNullOrWhiteSpace(jsonString))
                return default(TModel);

            jsonString = jsonString.Substring(1, jsonString.Length - 2);
            return JsonConvert.DeserializeObject<TModel>(jsonString);
        }
    }
}
