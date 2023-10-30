using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApiNetCore2023.ApplicationCore.Core.Models;
using WebApiNetCore2023.ApplicationCore.Core.ServicesContracts;

namespace WebApiNetCore2023.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ItemsController : ControllerBase
    {
        private readonly IItemService _itemService;
        public ItemsController(IItemService itemService)
        {
                _itemService = itemService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            IEnumerable<ItemModel> result;

            result = await _itemService.GetAll();

            return Ok(result);
        }
    }
}
