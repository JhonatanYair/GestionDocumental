namespace GD.Models.Request.Usuario
{
    public class UpdateUserRequest
    {
        public int UsuarioId { get; set; }
        public string Nombre { get; set; } = null!;
        public string User { get; set; } = null!;
        public int RolId { get; set; }
        public int AreaId { get; set; }
    }
}
