import { Component, OnInit } from '@angular/core';
import { Area } from '../../../../models/area.model';
import { JwtPayload } from '../../../../models/jwtPayload.model';
import { AreaService } from '../../services/area.service';
import { DecodedTokenService } from '../../../../services/Decoded/decoded-token.service';
import { AreaFormComponent } from '../area-form/area-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-area-list',
  standalone: true,
  imports: [CommonModule, AreaFormComponent, FormsModule, HttpClientModule], 
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.scss']
})
export class AreaListComponent implements OnInit {
  areas: Area[] = [];
  mostrarModal = false;
  areaSeleccionada?: Area;
  jwtPayload?: JwtPayload;

  constructor(private areaService: AreaService, private decodedTokenService: DecodedTokenService) {}

  ngOnInit(): void {
    this.cargarAreas();
    this.jwtPayload = this.decodedTokenService.decodedToken();
  }

  cargarAreas() {
    this.areaService.getAll().subscribe(data => this.areas = data);
  }

  abrirModal(area?: Area) {
    this.areaSeleccionada = area;
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.areaSeleccionada = undefined;
  }
}
