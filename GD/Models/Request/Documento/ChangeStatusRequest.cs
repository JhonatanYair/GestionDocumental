namespace GD.Models.Request.Documento
{
    public class ChangeStatusRequest
    {
        public int DocumentoId { get; set; }
        public int EstadoId { get; set; }
    }
}
