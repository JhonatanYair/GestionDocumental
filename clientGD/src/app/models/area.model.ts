import { Sede } from "./sede.model";

export interface Area {
    areaId: number;
    nombre: string;
    codigo?: string;
    sedeId: number;
    sede?: Sede
  }
  