using GD.Models.DB;
using Microsoft.EntityFrameworkCore;

namespace GD.Services
{
    public interface IRolService
    {
        Task<List<Rol>> GetAllRol();
    }

    public class RolService : IRolService
    {

        private readonly DGDbContext _context;

        public RolService(DGDbContext context)
        {
            _context = context;
        }

        public async Task<List<Rol>> GetAllRol()
        {
            return await _context.Rols.ToListAsync();
        }

    }
}
