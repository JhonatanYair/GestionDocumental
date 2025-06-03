using System;
using System.Collections.Generic;

namespace GD.Models.DB;

public partial class Documento
{
    public int DocumentoId { get; set; }

    public string Nombre { get; set; } = null!;

    public string? Tipo { get; set; }
    public string Src { get; set; }

    public DateTime FechaCreacion { get; set; }

    public int? UsuarioId { get; set; }
    public int? UsuarioRadicadorId { get; set; }

    public int? EstadoActualId { get; set; }

    public int? AreaActualId { get; set; }

    public int? TiempoRespuestaDias { get; set; }

    public DateTime? FechaAceptado { get; set; }

    public virtual Area? AreaActual { get; set; }

    public virtual EstadoDocumento? EstadoActual { get; set; }

    public virtual ICollection<HistorialDocumento> HistorialDocumentos { get; set; } = new List<HistorialDocumento>();

    public virtual Usuario? Usuario { get; set; }
    public virtual Usuario? UsuarioRadicador { get; set; }
}
