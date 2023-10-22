using Microsoft.AspNetCore.Mvc;
using WebApiNetCore2023.ApplicationCore.Core.Models;
using WebApiNetCore2023.ApplicationCore.Core.ServicesContracts;

namespace WebApiNetCore2023.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HeroesController : Controller
    {
        private readonly IHeroService _heroService;
        public HeroesController(IHeroService heroService)
        {
            _heroService = heroService;
        }

        // GET: api/<LocationsController>
        [HttpGet]
        [IgnoreAntiforgeryToken]
        public async Task<IActionResult> Get(string? name)
        {
            IEnumerable<HeroModel> result;
            
            if(string.IsNullOrWhiteSpace(name))
                result = await _heroService.GetAll();
            else
                result = await _heroService.GetAll(name);

            return Ok(result);
        }

        // GET api/<LocationsController>/5
        [HttpGet("{id}")]
        [IgnoreAntiforgeryToken]
        public async Task<IActionResult> Get(int id)
        {
            var hero = await _heroService.GetById(id);
            return Ok(hero);
        }

        // POST api/<LocationsController>
        [HttpPost]
        [IgnoreAntiforgeryToken]
        public async Task<IActionResult> Post([FromBody] HeroModel model)
        {
            var result = await _heroService.Add(model);
            return Ok(result);
        }

        // PUT api/<LocationsController>/5
        [HttpPut]
        [IgnoreAntiforgeryToken]
        public async Task<IActionResult> Put([FromBody] HeroModel model)
        {
            var result = await _heroService.Update(model);
            return Ok(result);
        }

        // DELETE api/<LocationsController>/5
        [HttpDelete("{id}")]
        [IgnoreAntiforgeryToken]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _heroService.Delete(new HeroModel { Id = id});
            return Ok(result);
        }
    }
}
