import { Component } from '@angular/core';
import { Documento } from '../../../models/docs.model';
import { JwtPayload } from '../../../models/jwtPayload.model';
import { DashboardRadicadorService } from '../services/dashboard-radicador.service';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashboard-radicador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-radicador.component.html',
  styleUrl: './dashboard-radicador.component.css'
})
export class DashboardRadicadorComponent {

    documentos: Documento[] = [];
    decoded?: JwtPayload;
    totalDocs = 0;
    numDocsRadidacos = 0;
    numDocsAceptados = 0;
    numDocsFinalizados = 0;
  
    constructor(private dashboardService: DashboardRadicadorService) {}
      
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
  
      this.dashboardService.getDocs(usuarioId).subscribe({
        next: (data) =>{
          this.documentos = data;
          this.getData();
        } ,
        error: (err) => console.error('Error al obtener documentos:', err),
      });
    }

    getData(){
      this.totalDocs = this.documentos.length;
      this.numDocsRadidacos = this.documentos.filter(p => p.estadoActualId === 1).length;
      this.numDocsAceptados = this.documentos.filter(p => p.estadoActualId === 3).length;
      this.numDocsFinalizados = this.documentos.filter(p => p.estadoActualId === 4).length;
    }

}
