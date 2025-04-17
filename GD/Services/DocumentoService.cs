using GD.Models.Response.Documento;
using GD.Models.Request.Documento;
using GD.Models.DB;

namespace GD.Services
{
    public interface IDocumentoService
    {
        Task<RadicarDocResponse> RadicarDocumento(RadicarDocRequest request);
    }

    public class DocumentoService : IDocumentoService
    {
        private readonly DGDbContext _context;
        private readonly IMinioService _minioService;

        public DocumentoService(IMinioService minioService, DGDbContext context) 
        {
            _minioService = minioService;
            _context = context;
        }

        public async Task<RadicarDocResponse> RadicarDocumento(RadicarDocRequest request)
        {

            string urlPrivate = await _minioService.UploadFileAsync(request.File);

            var doc = new Documento
            {
                AreaActualId = request.AreaId,
                EstadoActualId = 1,
                UsuarioId = request.UsuarioId,
                Nombre = request.File.Name,
                Tipo = request.File.ContentType,
                Src = urlPrivate
            };

            await _context.Documentos.AddAsync(doc);
            await _context.SaveChangesAsync();

            return new RadicarDocResponse
            {
                Src = urlPrivate,
            };
        }
    }
}
