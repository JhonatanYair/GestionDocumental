using GD.Models.Request.Usuario;
using GD.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GD.Controllers
{
    [ApiController]
    [Route("api/[controller]/")]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;

        public UsuarioController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [Authorize]
        [HttpGet("GetAllUsuarios")]
        public async Task<IActionResult> GetAllUsuarios()
        {
            return Ok(await _usuarioService.GetAllUsuarios());
        }

        [Authorize]
        [HttpGet("GetAllUsuariosByAreaRac")]
        public async Task<IActionResult> GetAllUsuariosByAreaRac(int areaId)
        {
            return Ok(await _usuarioService.GetAllUsuariosByAreaRac(areaId));
        }

        [HttpPost("GetLogin")]
        public async Task<IActionResult> GetLogin([FromBody] LoginRequest loginRequest)
        {
            return Ok(await _usuarioService.GetLogin(loginRequest));
        }

        [Authorize]
        [HttpPost("CreateUsuario")]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserRequest userRequest)
        {
            return Ok(await _usuarioService.CreateUser(userRequest));
        }

        [Authorize]
        [HttpPut("UpdateUser/{usuarioId}")]
        public async Task<IActionResult> UpdateUser(int usuarioId, [FromBody] UpdateUserRequest userRequest)
        {
            return Ok(await _usuarioService.UpdateUser(usuarioId, userRequest));
        }

        [Authorize]
        [HttpDelete("DeleteUser")]
        public async Task<IActionResult> DeleteUser(int userId)
        {
            return Ok(await _usuarioService.DeleteUser(userId));
        }

    }
}
