using System;
using System.Collections.Generic;

namespace GD.Models.DB;

public partial class Usuario
{
    public int UsuarioId { get; set; }

    public string Nombre { get; set; } = null!;

    public string User { get; set; } = null!;

    public string Password { get; set; } = null!;

    public int RolId { get; set; }

    public int AreaId { get; set; }

    public virtual Area? Area { get; set; }

    public virtual ICollection<Documento> Documentos { get; set; } = new List<Documento>();

    public virtual ICollection<HistorialDocumento> HistorialDocumentos { get; set; } = new List<HistorialDocumento>();

    public virtual Rol? Rol { get; set; }
}
