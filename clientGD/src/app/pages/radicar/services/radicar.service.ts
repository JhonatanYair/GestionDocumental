import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HelpersService } from '../../../services/Common/helpers.service';


@Injectable({
  providedIn: 'root'
})
export class RadicarService {

  constructor(
    private http: HttpClient,
    private helpersService: HelpersService
  ) {}

  radicarDocumento(data: FormData): Observable<any> {
    return this.http.post(`/api/Documento/RadicarDocumento`, data, {
      headers: this.helpersService.getAuthHeaders()
    });
  }
}
