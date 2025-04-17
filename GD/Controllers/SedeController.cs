using GD.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GD.Controllers
{
    [ApiController]
    [Route("api/[controller]/")]
    public class SedeController : ControllerBase
    {
        private readonly ISedeService _sedeService;

        public SedeController(ISedeService sedeService)
        {
            _sedeService = sedeService;
        }

        [Authorize]
        [HttpGet("GetAllSede")]
        public async Task<IActionResult> GetAllSede()
        {
            return Ok(await _sedeService.GetAllSede());
        }

    }
}
