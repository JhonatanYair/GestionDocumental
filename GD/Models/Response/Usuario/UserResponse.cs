namespace GD.Models.Response.Usuario
{
    public class UserResponse
    {
        public int UsuarioId { get; set; }

        public string Nombre { get; set; } = null!;

        public string User { get; set; } = null!;

        public int? RolId { get; set; }

        public int? AreaId { get; set; }
    }
}
