using GD.Models.DB;
using Microsoft.EntityFrameworkCore;

namespace GD.Services
{
    public interface ISedeService
    {
        Task<List<Sede>> GetAllSede();
    }

    public class SedeService : ISedeService
    {

        private readonly DGDbContext _context;

        public SedeService(DGDbContext context)
        {
            _context = context;
        }

        public async Task<List<Sede>> GetAllSede()
        {
            return await _context.Sedes.ToListAsync();
        }

    }
}
