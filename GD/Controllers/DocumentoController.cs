using GD.Models.DB;
using GD.Models.Request.Documento;
using GD.Models.Request.Usuario;
using GD.Models.Response.Documento;
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
        private readonly IMinioService _minioService;

        public DocumentoController(IDocumentoService documentoService, IMinioService minioService)
        {
            _documentoService = documentoService;
            _minioService = minioService;
        }

        [Authorize]
        [HttpPost("RadicarDocumento")]
        public async Task<IActionResult> RadicarDocumento([FromForm] RadicarDocRequest request)
        {
            return Ok(await _documentoService.RadicarDocumento(request));
        }

        [Authorize]
        [HttpGet("GetDocs")]
        public async Task<IActionResult> GetDocs(int usuarioId)
        {
            return Ok(await _documentoService.GetDocumentos(usuarioId));
        }

        [Authorize]
        [HttpGet("GetDocsRadicados")]
        public async Task<IActionResult> GetDocsRadicados(int usuarioId)
        {
            return Ok(await _documentoService.GetDocumentosRadicados(usuarioId));
        }

        [Authorize]
        [HttpPost("GetUrlFile")]
        public async Task<IActionResult> GetUrlFile([FromBody] GetUrlFileRequest getUrlFileRequest)
        {
            var getDocUrlResponse = new GetDocUrlResponse
            {
                Url = _minioService.GetPrivateUrl(getUrlFileRequest.ObjectKey)
            };
            getDocUrlResponse.Url = getDocUrlResponse.Url.Replace("https", "http");

            return Ok(getDocUrlResponse);
        }

        [Authorize]
        [HttpPut("ChangeStatus")]
        public async Task<IActionResult> ChangeStatus([FromBody] ChangeStatusRequest changeStatusRequest)
        {
            var result = await _documentoService.ChangeStatus(changeStatusRequest.DocumentoId, changeStatusRequest.EstadoId);
            if (!result) return NotFound();
            return Ok(true);
        }

        [Authorize]
        [HttpPut("TrasladarDoc")]
        public async Task<IActionResult> TrasladarDoc([FromBody] TrasladarDocRequest trasladarDocRequest)
        {
            return Ok(await _documentoService.TrasladarDoc(trasladarDocRequest.AreaId, trasladarDocRequest.UsuarioId, trasladarDocRequest.DocumentoId));
        }

        [Authorize]
        [HttpPut("ParametrizarDoc")]
        public async Task<IActionResult> ParametrizarDoc([FromBody] ParametrizarDocRequest parametrizarDocRequest)
        {
            return Ok(await _documentoService.ParametrizarDoc(parametrizarDocRequest.NombreDoc, parametrizarDocRequest.NumDays, parametrizarDocRequest.DocumentoId));
        }

    }
}
