using GD.Models.Request.Documento;
using GD.Models.Request.Usuario;
using GD.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GD.Controllers
{
    [ApiController]
    [Route("api/[controller]/")]
    public class DocumentoController : ControllerBase
    {

        private readonly IDocumentoService _documentoService;

        public DocumentoController(IDocumentoService documentoService)
        {
            _documentoService = documentoService;
        }

        [Authorize]
        [HttpPost("RadicarDocumento")]
        public async Task<IActionResult> RadicarDocumento([FromForm] RadicarDocRequest request)
        {
            return Ok(await _documentoService.RadicarDocumento(request));
        }

    }
}
