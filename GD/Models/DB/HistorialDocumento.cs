using System;
using System.Collections.Generic;

namespace GD.Models.DB;

public partial class HistorialDocumento
{
    public int HistorialId { get; set; }

    public int? DocumentoId { get; set; }

    public int? EstadoId { get; set; }

    public DateTime FechaCambio { get; set; }

    public int? UsuarioId { get; set; }

    public virtual Documento? Documento { get; set; }

    public virtual EstadoDocumento? Estado { get; set; }

    public virtual Usuario? Usuario { get; set; }
}
