import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../../models/usuario.model';
import { Observable } from 'rxjs';
import { HelpersService } from '../../../services/Common/helpers.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient,
    private helpersService: HelpersService
  ) {}

  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`/api/Usuario/GetAllUsuarios`,{
      headers: this.helpersService.getAuthHeaders()
    });
  }

  getAllBySede(usuarioId: number): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`/api/Area/GetAllUsuarioBySede?usuarioId=${usuarioId}`,{
      headers: this.helpersService.getAuthHeaders()
    });
  }

  create(usuario: Partial<Usuario>): Observable<Usuario> {
    return this.http.post<Usuario>(`/api/Usuario/CreateUsuario`, usuario,{
      headers: this.helpersService.getAuthHeaders()
    });
  }

  update(id: number, usuario: Partial<Usuario>): Observable<Usuario> {
    return this.http.put<Usuario>(`/api/Usuario/UpdateUser/${id}`, usuario,{
      headers: this.helpersService.getAuthHeaders()
    });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`/api/Usuario/DeleteUsuario?usuarioId=${id}`,{
      headers: this.helpersService.getAuthHeaders()
    });
  }

}
