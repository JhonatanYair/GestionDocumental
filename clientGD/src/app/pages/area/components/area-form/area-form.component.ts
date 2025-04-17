import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { Area } from '../../../../models/area.model';
import { Sede } from '../../../../models/sede.model';
import { AreaService } from '../../services/area.service';
import { SedesService } from '../../../../services/Sedes/sedes.service';
import { CommonModule } from '@angular/common';
import { JwtPayload } from '../../../../models/jwtPayload.model';
import { DecodedTokenService } from '../../../../services/Decoded/decoded-token.service';


@Component({
  selector: 'app-area-form',
  templateUrl: './area-form.component.html',
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  standalone: true,
})
export class AreaFormComponent implements OnInit {
  @Input() area?: Area;
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardado = new EventEmitter<void>();

  form!: FormGroup;
  sedes: Sede[] = [];
  jwtPayload?: JwtPayload;

  constructor(
    private fb: FormBuilder,
    private areaService: AreaService,
    private sedeService: SedesService,
    private decodedTokenService: DecodedTokenService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: [this.area?.nombre || '', Validators.required],
      sedeId: [this.area?.sedeId || 0, Validators.required]
    });
    this.jwtPayload = this.decodedTokenService.decodedToken();
    this.cargarSedes();
    console.log(this.area);
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

    const obs = this.area
      ? this.areaService.update(this.area.areaId, data)
      : this.areaService.create(data);

    obs.subscribe(() => {
      this.guardado.emit();
      this.cerrar.emit();
    });
  }
}
