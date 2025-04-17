namespace GD.Models.Request.Documento
{
    public class RadicarDocRequest
    {
        public int AreaId { get; set; }
        public int UsuarioId { get; set; }
        public IFormFile File { get; set; }
    }
}
