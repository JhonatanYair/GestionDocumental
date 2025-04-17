using System;
using System.Collections.Generic;

namespace GD.Models.DB;

public partial class EstadoDocumento
{
    public int EstadoId { get; set; }

    public string Nombre { get; set; } = null!;

    public virtual ICollection<Documento> Documentos { get; set; } = new List<Documento>();

    public virtual ICollection<HistorialDocumento> HistorialDocumentos { get; set; } = new List<HistorialDocumento>();
}
