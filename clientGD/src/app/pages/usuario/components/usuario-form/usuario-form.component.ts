import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { Usuario } from '../../../../models/usuario.model';
import { Sede } from '../../../../models/sede.model';
import { UsuarioService } from '../../services/usuario.service';
import { SedesService } from '../../../../services/Sedes/sedes.service';
import { CommonModule } from '@angular/common';
import { JwtPayload } from '../../../../models/jwtPayload.model';
import { DecodedTokenService } from '../../../../services/Decoded/decoded-token.service';

@Component({
    selector: 'app-usuario-form',
    templateUrl: './usuario-form.component.html',
    imports: [FormsModule, ReactiveFormsModule,CommonModule],
    standalone: true,
  })
  export class UsuarioFormComponent implements OnInit {
    @Input() usuario?: Usuario;
    @Output() cerrar = new EventEmitter<void>();
    @Output() guardado = new EventEmitter<void>();
  
    form!: FormGroup;
    sedes: Sede[] = [];
    jwtPayload?: JwtPayload;
  
    constructor(
      private fb: FormBuilder,
      private usuarioService: UsuarioService,
      private sedeService: SedesService,
      private decodedTokenService: DecodedTokenService
    ) {}
  
    ngOnInit(): void {
      this.form = this.fb.group({
        nombre: [this.usuario?.nombre || '', Validators.required],
        user: [this.usuario?.user || 0, Validators.required],
        rolId: [this.usuario?.rolId || 0, Validators.required],
        areaId: [this.usuario?.areaId || 0, Validators.required],
        password: [this.usuario?.password || 0, Validators.required]
      });
      this.jwtPayload = this.decodedTokenService.decodedToken();
      this.cargarSedes();
      console.log(this.usuario);
    }
  
    cargarSedes() {
      // const sedeId = this.jwtPayload?.role == "Admin" ? null : localStorage.getItem("sede");
      // const request$ = sedeId ? this.sedeService.getAllBySedeId(Number(sedeId)) : this.sedeService.getAll();
      // request$.subscribe((data: Sede[]) => {
      //   this.sedes = data;
      // });
      // console.log(this.sedes);
      //const sedeId = this.jwtPayload?.role == "Admin" ? null : localStorage.getItem("sede");
      this.sedeService.getAll().subscribe((data: Sede[]) => {
           this.sedes = data;
      });;
    }
  
    guardar() {
      if (this.form.invalid) return;
  
      const data = this.form.value;
  
      const obs = this.usuario
        ? this.usuarioService.update(this.usuario.usuarioId, data)
        : this.usuarioService.create(data);
  
      obs.subscribe(() => {
        this.guardado.emit();
        this.cerrar.emit();
      });
    }
  }