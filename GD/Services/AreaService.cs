using GD.Models.DB;
using GD.Models.Request.Area;
using Microsoft.EntityFrameworkCore;

namespace GD.Services
{

    public interface IAreaService
    {
        Task<List<Area>> GetAllArea();
        Task<List<Area>> GetAllAreaBySede(int sedeId);
        Task<Area> CreateArea(AreaRequest areaRequest);
        Task<Area> UpdateArea(int areaId, AreaRequest areaRequest);
        Task<bool> DeleteArea(int areaId);
    }

    public class AreaService : IAreaService
    {
        private readonly DGDbContext _context;

        public AreaService(DGDbContext context)
        {
            _context = context;
        }

        public async Task<List<Area>> GetAllArea()
        {
            var areas = await _context.Areas
            .Include(a => a.Sede)
            .Select(a => new Area
            {
                AreaId = a.AreaId,
                Nombre = a.Nombre,
                Codigo = a.Codigo,
                SedeId = a.SedeId,
                Sede = new Sede
                {
                    SedeId = a.Sede.SedeId,
                    Nombre = a.Sede.Nombre,
                    Ciudad = a.Sede.Ciudad,
                },
            }).ToListAsync();
            return areas;
        }

        public async Task<List<Area>> GetAllAreaBySede(int sedeId)
        {
            var areas = await _context.Areas
            .Include(a => a.Sede)
            .Select(a => new Area
            {
                AreaId = a.AreaId,
                Nombre = a.Nombre,
                Codigo = a.Codigo,
                SedeId = a.SedeId,
                Sede = new Sede
                {
                    SedeId = a.Sede.SedeId,
                    Nombre = a.Sede.Nombre,
                    Ciudad = a.Sede.Ciudad,
                },
            })
            .Where(p => p.SedeId == sedeId)
            .ToListAsync();
            return areas;
        }

        public async Task<Area> CreateArea(AreaRequest areaRequest)
        {
            var area = new Area
            {
                Nombre = areaRequest.Nombre,
                SedeId = areaRequest.SedeId,
                Codigo = GenerarCodigoAlfanumerico(6)
            };

            await _context.Areas.AddAsync(area);
            await _context.SaveChangesAsync();

            return area;
        }

        public async Task<Area> UpdateArea(int areaId, AreaRequest areaRequest)
        {
            var area = await _context.Areas.FirstOrDefaultAsync(p => p.AreaId == areaId);

            area.Nombre = areaRequest.Nombre;
            area.SedeId = areaRequest.SedeId;

            _context.Areas.Update(area);
            await _context.SaveChangesAsync();

            return area;
        }

        public async Task<bool> DeleteArea(int areaId)
        {
            var area = await _context.Areas.FirstOrDefaultAsync(p => p.AreaId == areaId);

            _context.Areas.Remove(area);
            await _context.SaveChangesAsync();

            return true;
        }

        private string GenerarCodigoAlfanumerico(int longitud)
        {
            const string caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            Random random = new Random();
            return new string(Enumerable.Repeat(caracteres, longitud)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }

    }
}
