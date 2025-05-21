import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Area } from '../../models/area.model';
import { Observable } from 'rxjs';
import { HelpersService } from '../Common/helpers.service';

@Injectable({
  providedIn: 'root'
})
export class AreasService {

  constructor(
    private http: HttpClient,
    private helpersService: HelpersService
  ) { }

  // getAll(): Observable<Sede[]> {
  //   return this.http.get<Sede[]>(`/api/Area/GetAllArea`,{
  //     headers: this.helpersService.getAuthHeaders()
  //   });
  // }

  // getAllBySedeId(sedeId: number): Observable<Sede[]> {
  //   return this.http.get<Sede[]>(`/api/Area/GetAllArea?sedeId=${sedeId}`,{
  //     headers: this.helpersService.getAuthHeaders()
  //   });
  // }

  getAll(): Observable<Area[]> {
    return this.http.get<Area[]>(`/api/Area/GetAllArea`,{
      headers: this.helpersService.getAuthHeaders()
    });
  }

}
