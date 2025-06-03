import { Estado } from "./estado.model";
import { Usuario } from "./usuario.model";


export interface Documento {
    documentoId: number;
    nombre: string;
    tipo: string;
    src: string;
    fechaCreacion: Date;
    fechaAceptado: Date;
    usuarioId: number;
    usuarioRadicadorId: number;
    usuario?: Usuario;
    usuarioRadicador?: Usuario;
    estadoActualId: number;
    estadoActual: Estado;
    tiempoRespuestaDias: number;
    mostrarBotonGuardar: boolean;
    estadoCambiar: number;
}
  