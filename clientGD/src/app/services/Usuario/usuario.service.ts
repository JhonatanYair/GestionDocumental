import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { Observable } from 'rxjs';
import { HelpersService } from '../Common/helpers.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient,
    private helpersService: HelpersService
  ) { }

    getAllBySedeRac(areaId: number): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`/api/Usuario/GetAllUsuariosByAreaRac?areaId=${areaId}`,{
      headers: this.helpersService.getAuthHeaders()
    });
  }

}
