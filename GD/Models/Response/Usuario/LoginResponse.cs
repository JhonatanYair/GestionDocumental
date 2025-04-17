namespace GD.Models.Response.Usuario
{
    public class LoginResponse
    {
        public int UsuarioId { get; set; }
        public string Nombre { get; set; }
        public string User { get; set; }
        public string Token { get; set; }
        public int SedeId { get; set; }
    }
}
