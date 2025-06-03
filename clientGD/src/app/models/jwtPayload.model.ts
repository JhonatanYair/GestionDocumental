export interface JwtPayload {
    unique_name: string;
    role: string;
    exp: number;
    usuarioId: string
  }