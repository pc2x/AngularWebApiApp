using WebApiNetCore2023.ApplicationCore.Core.Models;
using WebApiNetCore2023.ApplicationCore.Core.RepositoriesContracts;
using WebApiNetCore2023.ApplicationCore.Core.ServicesContracts;

namespace WebApiNetCore2023.ApplicationCore.Services
{
    public class LocationService : ILocationService
    {
        private readonly ILocationRepository _repository;

        public LocationService(ILocationRepository repository)
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
