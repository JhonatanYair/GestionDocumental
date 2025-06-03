import { Area } from "./area.model";

export interface Usuario {
    usuarioId: number;
    nombre: string;
    user: string;
    rolId: number;
    areaId: number;
    password : string;
    area? : Area
  }
  