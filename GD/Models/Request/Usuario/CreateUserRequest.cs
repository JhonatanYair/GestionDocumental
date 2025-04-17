namespace GD.Models.Request.Usuario
{
    public class CreateUserRequest
    {
        public string Nombre { get; set; } = null!;
        public string User { get; set; } = null!;
        public string Password { get; set; } = null!;
        public int RolId { get; set; }
        public int AreaId { get; set; }
    }
}
