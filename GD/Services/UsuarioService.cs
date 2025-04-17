using GD.Common;
using GD.Models.DB;
using GD.Models.Request.Usuario;
using GD.Models.Response.Usuario;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace GD.Services
{
    public interface IUsuarioService
    {
        Task<List<Usuario>> GetAllUsuarios();
        Task<List<Usuario>> GetAllUsuariosByAreaRac(int areaId);
        Task<LoginResponse> GetLogin(LoginRequest loginRequest);
        Task<UserResponse> CreateUser(CreateUserRequest userRequest);
        Task<UserResponse> UpdateUser(UpdateUserRequest userRequest);
        Task<bool> DeleteUser(int usuarioId);
    }

    public class UsuarioService : IUsuarioService
    {
        private readonly DGDbContext _context;

        public UsuarioService(DGDbContext context) 
        {
            _context = context;
        }

        public async Task<List<Usuario>> GetAllUsuarios()
        {
            return await _context.Usuarios
                .Select(u=> new Usuario() 
                {
                    UsuarioId = u.UsuarioId,
                    Nombre = u.Nombre,
                    AreaId = u.AreaId,
                })
                .ToListAsync();
        }

        public async Task<List<Usuario>> GetAllUsuariosByAreaRac(int areaId)
        {
            return await _context.Usuarios
                .Where(u => u.AreaId == areaId && u.RolId != 3)
                .Select(u => new Usuario
                {
                    UsuarioId = u.UsuarioId,
                    Nombre = u.Nombre,
                    AreaId = u.AreaId,
                    RolId = u.RolId
                })
                .ToListAsync();
        }

        public async Task<LoginResponse> GetLogin(LoginRequest loginRequest)
        {
            string passEncrypt = Encrypt.GetSHA256(loginRequest.Password);

            var login = await _context.Usuarios.Include(p=>p.Rol).Include(p=> p.Area).FirstOrDefaultAsync(p => p.User == loginRequest.Usuario && p.Password == passEncrypt);

            if (login == null) return null;

            var tokenHandler = new JwtSecurityTokenHandler();
            var byteKey = Encoding.UTF8.GetBytes(AuthConfig.secretKeyJwt);
            var tokenDesc = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                        new Claim(ClaimTypes.Name,login.Nombre),
                        new Claim(ClaimTypes.Role,login.Rol.Nombre),
                }),
                Expires = DateTime.UtcNow.AddDays(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(byteKey), SecurityAlgorithms.HmacSha256Signature),
            };

            var token = tokenHandler.CreateToken(tokenDesc);

            return new LoginResponse
            {
                UsuarioId = login.UsuarioId,
                Token = tokenHandler.WriteToken(token),
                Nombre = login.Nombre,
                User = loginRequest.Usuario,
                SedeId = login.Area.SedeId
            };
        }

        public async Task<UserResponse> CreateUser(CreateUserRequest userRequest)
        {
            var user = new Usuario 
            {
                Password = Encrypt.GetSHA256(userRequest.Password),
                RolId = userRequest.RolId,
                AreaId = userRequest.AreaId,
                Nombre = userRequest.Nombre,
                User = userRequest.User
            };

            await _context.Usuarios.AddAsync(user);
            await _context.SaveChangesAsync();

            return new UserResponse
            {
                UsuarioId = user.UsuarioId,
                Nombre = userRequest.Nombre
            };

        }

        public async Task<UserResponse> UpdateUser(UpdateUserRequest userRequest)
        {
            var user = new Usuario
            {
                RolId = userRequest.RolId,
                AreaId = userRequest.AreaId,
                Nombre = userRequest.Nombre,
                User = userRequest.User
            };

            _context.Usuarios.Update(user);
            await _context.SaveChangesAsync();

            return new UserResponse
            {
                UsuarioId = user.UsuarioId,
                Nombre = userRequest.Nombre
            };

        }

        public async Task<bool> DeleteUser(int usuarioId)
        {
            var entity = _context.Usuarios.FirstOrDefault(p=> p.UsuarioId == usuarioId);

            if (entity == null) 
            {
                throw new Exception("No existe el usuario");
            }

            _context.Usuarios.Remove(entity);
            await _context.SaveChangesAsync();

            return true;
        }

    }
}
