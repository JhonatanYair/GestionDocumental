using GD.Models.Response.Documento;
using GD.Models.Request.Documento;
using GD.Models.DB;
using Microsoft.EntityFrameworkCore;

namespace GD.Services
{
    public interface IDocumentoService
    {
        Task<RadicarDocResponse> RadicarDocumento(RadicarDocRequest request);
        Task<List<Documento>> GetDocumentos(int usuarioId);
        Task<bool> ChangeStatus(int documentoId, int estadoId);
        Task<bool> TrasladarDoc(int areaId, int usuarioId, int documentoId);
        Task<bool> ParametrizarDoc(string nombreDoc, int numDays, int documentoId);
        Task<List<Documento>> GetDocumentosRadicados(int usuarioId);
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
                UsuarioRadicadorId = request.UsuarioRadicadorId,
                Nombre = request.File.FileName,
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

        public async Task<List<Documento>> GetDocumentos(int usuarioId)
        {
            var docs = await _context.Documentos.Include(p => p.EstadoActual)
                .Include(p=> p.Usuario)
                .ThenInclude(b => b.Area)
                .Include(p=> p.UsuarioRadicador)
                .ThenInclude(b => b.Area)
                .Where(e => e.UsuarioId == usuarioId)
                .Select(u => new Documento
                {
                    DocumentoId = u.DocumentoId,
                    Nombre = u.Nombre,
                    Tipo= u.Tipo,
                    Src = u.Src,
                    FechaCreacion = u.FechaCreacion,
                    FechaAceptado = u.FechaAceptado,
                    UsuarioId = u.UsuarioId,
                    EstadoActual = new EstadoDocumento
                    {
                        EstadoId = u.EstadoActual.EstadoId,
                        Nombre = u.EstadoActual.Nombre
                    },
                    Usuario = new Usuario
                    {
                        Nombre = u.Usuario.Nombre,
                        Area = new Area 
                        {
                            Nombre = u.Usuario.Area.Nombre
                        },
                    },
                    UsuarioRadicador = new Usuario
                    {
                        Nombre = u.UsuarioRadicador.Nombre,
                        Area = new Area
                        {
                            Nombre = u.UsuarioRadicador.Area.Nombre
                        },
                    },
                    EstadoActualId = u.EstadoActualId,
                    TiempoRespuestaDias = u.TiempoRespuestaDias,

                }).ToListAsync();
            return docs;
        }

        public async Task<List<Documento>> GetDocumentosRadicados(int usuarioId)
        {
            var docs = await _context.Documentos.Include(p => p.EstadoActual)
                .Include(p => p.Usuario)
                .ThenInclude(b => b.Area)
                .Include(p => p.UsuarioRadicador)
                .ThenInclude(b => b.Area)
                .Where(e => e.UsuarioRadicadorId == usuarioId)
                .Select(u => new Documento
                {
                    DocumentoId = u.DocumentoId,
                    Nombre = u.Nombre,
                    Tipo = u.Tipo,
                    Src = u.Src,
                    FechaCreacion = u.FechaCreacion,
                    FechaAceptado = u.FechaAceptado,
                    UsuarioId = u.UsuarioId,
                    EstadoActual = new EstadoDocumento
                    {
                        EstadoId = u.EstadoActual.EstadoId,
                        Nombre = u.EstadoActual.Nombre
                    },
                    Usuario = new Usuario
                    {
                        Nombre = u.Usuario.Nombre,
                        Area = new Area
                        {
                            Nombre = u.Usuario.Area.Nombre
                        },
                    },
                    UsuarioRadicador = new Usuario
                    {
                        Nombre = u.UsuarioRadicador.Nombre,
                        Area = new Area
                        {
                            Nombre = u.UsuarioRadicador.Area.Nombre
                        },
                    },
                    EstadoActualId = u.EstadoActualId,
                    TiempoRespuestaDias = u.TiempoRespuestaDias,

                }).ToListAsync();
            return docs;
        }

        public async Task<bool> ChangeStatus(int documentoId, int estadoId)
        {
            var doc = await _context.Documentos.FirstOrDefaultAsync(p => p.DocumentoId == documentoId);

            if (doc == null) return false;

            doc.EstadoActualId = estadoId;

            if(doc.EstadoActualId == 2)
            {
                doc.FechaAceptado = DateTime.Now;
            }

            if (doc.TiempoRespuestaDias == null) doc.TiempoRespuestaDias = 5; 

            _context.Documentos.Update(doc);

            await _context.HistorialDocumentos.AddAsync(
                new HistorialDocumento
                {
                    DocumentoId = documentoId,
                    FechaCambio = DateTime.Now,
                    EstadoId = estadoId,
                });

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> TrasladarDoc(int areaId, int usuarioId, int documentoId)
        {
            var doc = await _context.Documentos.FirstOrDefaultAsync(p => p.DocumentoId == documentoId);

            if (doc == null) return false;

            doc.AreaActualId = areaId;
            doc.UsuarioId = usuarioId;
            doc.EstadoActualId = 2;

            await _context.HistorialDocumentos.AddAsync(
            new HistorialDocumento
            {
                DocumentoId = documentoId,
                FechaCambio = DateTime.Now,
                EstadoId = 2,
            });

            _context.Documentos.Update(doc);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> ParametrizarDoc(string nombreDoc, int numDays, int documentoId)
        {
            var doc = await _context.Documentos.FirstOrDefaultAsync(p => p.DocumentoId == documentoId);

            if (doc == null) return false;

            doc.TiempoRespuestaDias = numDays;
            doc.Nombre = nombreDoc;

            _context.Documentos.Update(doc);
            await _context.SaveChangesAsync();

            return true;
        }

    }
}
