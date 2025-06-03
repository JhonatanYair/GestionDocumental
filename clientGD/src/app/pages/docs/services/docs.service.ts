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
export class DocsService {

  constructor(
    private http: HttpClient,
    private helpersService: HelpersService
  ) { }


    getDocs(usuarioId: number): Observable<Documento[]> {
      return this.http.get<Documento[]>(`/api/Documento/GetDocs?usuarioId=${usuarioId}`,{
        headers: this.helpersService.getAuthHeaders()
      });
    }

    getUrlDoc(objectKey: string): Observable<PostUrlFile> {
      const getUrlFileRequest: GetUrlFile = {
        objectKey: objectKey
      };
      return this.http.post<PostUrlFile>(`/api/Documento/GetUrlFile`, getUrlFileRequest, {
        headers: this.helpersService.getAuthHeaders(),
      });
    }

    putStatusDoc(doc: Documento): Observable<boolean> {
      const putChangeDoc: PutChangeDoc = {
        documentoId: doc.documentoId,
        estadoId: doc.estadoCambiar
      };
      return this.http.put<boolean>(`/api/Documento/ChangeStatus`, putChangeDoc, {
        headers: this.helpersService.getAuthHeaders(),
      });
    }

    trasladarDoc(doc: Partial<TrasladarDocRequest>): Observable<boolean> {
      return this.http.put<boolean>(`/api/Documento/TrasladarDoc`, doc, {
        headers: this.helpersService.getAuthHeaders(),
      });
    }

    ParametrizarDoc(doc: Partial<ParametrizarDoc>): Observable<boolean> {
      return this.http.put<boolean>(`/api/Documento/ParametrizarDoc`, doc, {
        headers: this.helpersService.getAuthHeaders(),
      });
    }
  
}