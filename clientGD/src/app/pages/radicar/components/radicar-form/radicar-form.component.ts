import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RadicarService } from '../../services/radicar.service';
import { SedesService } from '../../../../services/Sedes/sedes.service';
import { AreaService } from '../../../area/services/area.service';
import { UsuarioService } from '../../../../services/Usuario/usuario.service';
import { DecodedTokenService } from '../../../../services/Decoded/decoded-token.service';
import { JwtPayload } from '../../../../models/jwtPayload.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-radicar-form',
  templateUrl: './radicar-form.component.html',
    standalone: true,
    styleUrls: ['./radicar-form.component.css'],
    imports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule], 
})
export class RadicarFormComponent implements OnInit {
  form!: FormGroup;
  sedes: any[] = [];
  areas: any[] = [];
  usuarios: any[] = [];
  archivoSeleccionado!: File;
  jwtPayload?: JwtPayload;
  usuarioRadicadorId: any = 0;

  loading = false;

  constructor(
    private fb: FormBuilder,
    private radicarService: RadicarService,
    private sedeService: SedesService,
    private areaService: AreaService,
    private usuarioService: UsuarioService,
    private decodedTokenService: DecodedTokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.jwtPayload = this.decodedTokenService.decodedToken();
    this.usuarioRadicadorId = parseInt(this.jwtPayload.usuarioId)
    this.form = this.fb.group({
      sedeId: [null, Validators.required],
      areaId: [null, Validators.required],
      usuarioId: [null, Validators.required],
      archivo: [null, Validators.required],
    });

    this.cargarSedes();
  }

  cargarSedes() {
    this.sedeService.getAll().subscribe(data => this.sedes = data);
  }

  onSedeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const id = Number(target.value);
    console.log(target.value);
  
    this.form.patchValue({ areaId: null, usuarioId: null });
    this.areas = [];
    this.usuarios = [];
  
    if (!id) return;
  
    this.areaService.getAllBySede(id).subscribe(data => this.areas = data);
  }
  
  onAreaChange(event: Event) {

    const target = event.target as HTMLSelectElement;
    const id = Number(target.value);
  
    this.form.patchValue({ usuarioId: null });
    this.usuarios = [];
  
    if (!id) return;
  
    this.usuarioService.getAllBySedeRac(id)
      .subscribe(data => this.usuarios = data);
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.archivoSeleccionado = file;
      this.form.patchValue({ archivo: file });
    }
  }

  submit() {
    if (this.form.invalid || !this.archivoSeleccionado) return;

    const formData = new FormData();
    formData.append('AreaId', this.form.value.areaId);
    formData.append('UsuarioId', this.form.value.usuarioId);
    formData.append('File', this.archivoSeleccionado);
    formData.append('UsuarioRadicadorId',this.usuarioRadicadorId);

    this.loading = true;
    this.radicarService.radicarDocumento(formData)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () =>{ 
          alert('Documento radicado correctamente ✅');

          if(this.jwtPayload?.role === 'Admin'){
            this.router.navigate(['/docs-list']);
          }else if(this.jwtPayload?.role === 'Radicador'){
            this.router.navigate(['/dashboard-radicador']);
          }


        },
        error: err => alert(`Error al radicar documento ❌: ${err.message}`)
      });
  }
}
