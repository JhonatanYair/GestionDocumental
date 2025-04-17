using GD.Models.Request.Area;
using GD.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GD.Controllers
{
    [ApiController]
    [Route("api/[controller]/")]
    public class AreaController : ControllerBase
    {
        private readonly IAreaService _areaService;

        public AreaController(IAreaService areaService)
        {
            _areaService = areaService;
        }

        [Authorize]
        [HttpGet("GetAllArea")]
        public async Task<IActionResult> GetAllArea()
        {
            return Ok(await _areaService.GetAllArea());
        }

        [Authorize]
        [HttpGet("GetAllAreaBySede")]
        public async Task<IActionResult> GetAllAreaBySede(int sedeId)
        {
            return Ok(await _areaService.GetAllAreaBySede(sedeId));
        }

        [Authorize]
        [HttpPost("CreateArea")]
        public async Task<IActionResult> CreateArea([FromBody] AreaRequest areaRequest)
        {
            return Ok(await _areaService.CreateArea(areaRequest));
        }

        [Authorize]
        [HttpPut("UpdateArea/{areaId}")]
        public async Task<IActionResult> UpdateArea(int areaId,[FromBody] AreaRequest areaRequest)
        {
            return Ok(await _areaService.UpdateArea(areaId, areaRequest));
        }

        [Authorize]
        [HttpPost("DeleteArea")]
        public async Task<IActionResult> DeleteArea(int areaId)
        {
            return Ok(await _areaService.DeleteArea(areaId));
        }

    }
}
