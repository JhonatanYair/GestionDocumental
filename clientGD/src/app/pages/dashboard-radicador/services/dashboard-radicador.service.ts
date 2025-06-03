import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Documento } from '../../../models/docs.model';
import { PostUrlFile } from '../../../models/postUrlFile';
import { GetUrlFile } from '../../../models/getUrlFile.model';
import { PutChangeDoc } from '../../../models/putChangeDoc';
import { TrasladarDocRequest } from '../../../models/trasladarDocRequest.model';
import { ParametrizarDoc } from '../../../models/parametrizarDoc.model';
import { Observable } from 'rxjs';
import { HelpersService } from '../../../services/Common/helpers.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardRadicadorService {

  constructor(
    private http: HttpClient,
    private helpersService: HelpersService
  ) { }


    getDocs(usuarioId: number): Observable<Documento[]> {
      return this.http.get<Documento[]>(`/api/Documento/GetDocsRadicados?usuarioId=${usuarioId}`,{
        headers: this.helpersService.getAuthHeaders()
      });
    }

    
  
}