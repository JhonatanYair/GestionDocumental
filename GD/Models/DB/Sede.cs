using System;
using System.Collections.Generic;

namespace GD.Models.DB;

public partial class Sede
{
    public int SedeId { get; set; }

    public string Nombre { get; set; } = null!;

    public string Ciudad { get; set; } = null!;

    public virtual ICollection<Area> Areas { get; set; } = new List<Area>();
}
