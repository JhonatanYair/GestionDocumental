import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Usuario } from '../../../../models/usuario.model';
import { Rol } from '../../../../models/rol.model';
import { UsuarioService } from '../../services/usuario.service';
import { RolesService } from '../../../../services/Roles/roles.service';
import { AreasService } from '../../../../services/Areas/areas.service';
import { CommonModule } from '@angular/common';
import { JwtPayload } from '../../../../models/jwtPayload.model';
import { DecodedTokenService } from '../../../../services/Decoded/decoded-token.service';
import { Area } from '../../../../models/area.model';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  standalone: true,
})
export class UsuarioFormComponent implements OnInit {
  @Input() usuario?: Usuario;
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardado = new EventEmitter<void>();

  form!: FormGroup;
  roles: Rol[] = [];
  areas: Area[] = [];
  jwtPayload?: JwtPayload;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private rolService: RolesService,
    private areaService: AreasService,
    private decodedTokenService: DecodedTokenService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: [this.usuario?.nombre || '', Validators.required],
      user: [this.usuario?.user || 0, Validators.required],
      rolId: [this.usuario?.rolId || 0, Validators.required],
      areaId: [this.usuario?.areaId || 0, Validators.required],
      password: ['']
    });

    // Solo hacer requerida la contraseña si es nuevo usuario
    if (!this.usuario) {
      this.form.get('password')?.setValidators([Validators.required]);
    }

    this.jwtPayload = this.decodedTokenService.decodedToken();
    this.cargarRoles();
    this.cargarAreas();
    console.log(this.usuario);
  }

  cargarRoles() {
    this.rolService.getAll().subscribe((data: Rol[]) => {
      this.roles = data;
    });;
  }
  cargarAreas() {
    this.areaService.getAll().subscribe((data: Area[]) => {
      this.areas = data;
    });;
  }

  guardar() {
    if (this.form.invalid) return;

    const data = this.form.value;

    // Si estamos editando, eliminar la contraseña del objeto si está vacía
    if (this.usuario && !data.password) {
      delete data.password;
    }

    const obs = this.usuario
      ? this.usuarioService.update(this.usuario.usuarioId, data)
      : this.usuarioService.create(data);

    obs.subscribe(() => {
      this.guardado.emit();
      this.cerrar.emit();
    });
  }
}