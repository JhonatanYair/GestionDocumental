import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Area } from '../../../models/area.model';
import { Observable } from 'rxjs';
import { HelpersService } from '../../../services/Common/helpers.service';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(
    private http: HttpClient,
    private helpersService: HelpersService
  ) {}

  getAll(): Observable<Area[]> {
    return this.http.get<Area[]>(`/api/Area/GetAllArea`,{
      headers: this.helpersService.getAuthHeaders()
    });
  }

  getAllBySede(sedeId: number): Observable<Area[]> {
    return this.http.get<Area[]>(`/api/Area/GetAllAreaBySede?sedeId=${sedeId}`,{
      headers: this.helpersService.getAuthHeaders()
    });
  }

  create(area: Partial<Area>): Observable<Area> {
    return this.http.post<Area>(`/api/Area/CreateArea`, area,{
      headers: this.helpersService.getAuthHeaders()
    });
  }

  update(id: number, area: Partial<Area>): Observable<Area> {
    return this.http.put<Area>(`/api/Area/UpdateArea/${id}`, area,{
      headers: this.helpersService.getAuthHeaders()
    });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`/api/Area/DeleteArea?areaId=${id}`,{
      headers: this.helpersService.getAuthHeaders()
    });
  }

}
