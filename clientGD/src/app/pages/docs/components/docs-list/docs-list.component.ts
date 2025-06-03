import { Component, OnInit } from '@angular/core';
import { JwtPayload } from '../../../../models/jwtPayload.model';
import { DecodedTokenService } from '../../../../services/Decoded/decoded-token.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Documento } from '../../../../models/docs.model';
import { DocsService } from '../../services/docs.service';
import { jwtDecode } from 'jwt-decode';
import { PostUrlFile } from '../../../../models/postUrlFile';
import { DocsTrasladarComponent } from '../../components/docs-trasladar/docs-trasladar.component';
import { DocsParameterComponent } from '../../components/docs-parameter/docs-parameter.component';


@Component({
  selector: 'app-docs-list',
  standalone: true,
  imports: [CommonModule, DocsTrasladarComponent, DocsParameterComponent ,FormsModule, HttpClientModule],
  templateUrl: './docs-list.component.html',
  styleUrl: './docs-list.component.css'
})
export class DocsListComponent implements OnInit {
  
  documentos: Documento[] = [];
  decoded?: JwtPayload;
  postUrlFile?: PostUrlFile;
  mostrarModal = false;
  showModalOpen = false;
  trasladarDocId?: number;
  docParameter?: Documento;
  totalDocs = 0;
  totalDocsRad = 0;
  totalDocsFinalizado = 0;

  constructor(private docsService: DocsService, private decodedTokenService: DecodedTokenService) {}
    
    ngOnInit(): void {
      const token: string | null = localStorage.getItem('token');
      if (token) {
        this.decoded = jwtDecode<JwtPayload>(token);
        console.log(this.decoded);
        this.cargarDocs();
      } else {
        console.warn('No se encontró el token en localStorage');
      }
  }

  cargarDocs(): void {
    const usuarioId = parseInt(this.decoded?.usuarioId ?? '0');
    if (!usuarioId) {
      console.error('usuarioId no disponible para cargar documentos.');
      return;
    }

    this.docsService.getDocs(usuarioId).subscribe({
      next: (data) =>{
        this.documentos = data;
        this.gestionData();
      } ,
      error: (err) => console.error('Error al obtener documentos:', err),
    });
  }

  abrirDocumento(objectKey: string): void {
    this.docsService.getUrlDoc(objectKey).subscribe({
      next: (data) => {
        this.postUrlFile = data;
        window.open(this.postUrlFile.url, '_blank');
      },
      error: (error) => {
        console.error('Error al obtener el documento:', error);
      },
    });
  }

  onEstadoChange(event: Event, doc: Documento, index: number): void{
    const selectElement = event.target as HTMLSelectElement;
    const valorSeleccionado = parseInt(selectElement.value);
    doc.mostrarBotonGuardar = valorSeleccionado !== doc.estadoActualId;
    doc.estadoCambiar = valorSeleccionado;
  }
  
  changeEstado(doc: Documento): void{
    this.docsService.putStatusDoc(doc).subscribe((data: boolean) =>{
      if(data == true){
        alert("Se cambio el estado del documento.");
        doc.estadoActualId = doc.estadoCambiar;
        doc.mostrarBotonGuardar = false;
        this.documentos = [...this.documentos];
      }else{
        alert("Error al cambiar el estado");
      }
    });
  }

    abrirModal(docId: number) {
      this.trasladarDocId = docId;
      this.mostrarModal = true;
    }
  
    cerrarModal() {
      this.mostrarModal = false;
      this.trasladarDocId = undefined;
      this.cargarDocs();
    }

    gestionData() {
      this.totalDocs = this.documentos.length;
      this.totalDocsRad = this.documentos.filter(p => p.estadoActualId === 1).length;
      this.totalDocsFinalizado = this.documentos.filter(p => p.estadoActualId === 4).length;
    }

    openModalParam(doc : Documento){
      this.showModalOpen = true;
      this.docParameter = doc;
    }

    closeModalParam() {
      this.showModalOpen = false;
      this.trasladarDocId = undefined;
      this.cargarDocs();
    }

}
