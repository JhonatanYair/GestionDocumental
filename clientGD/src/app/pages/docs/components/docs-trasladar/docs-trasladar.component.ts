import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SedesService } from '../../../../services/Sedes/sedes.service';
import { AreaService } from '../../../area/services/area.service';
import { UsuarioService } from '../../../../services/Usuario/usuario.service';
import { DocsService } from '../../services/docs.service';

@Component({
  selector: 'app-docs-trasladar',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './docs-trasladar.component.html',
  styleUrl: './docs-trasladar.component.css'
})
export class DocsTrasladarComponent implements OnInit {
    @Input() documentoId?: number;  
    @Output() cerrar = new EventEmitter<void>();
    @Output() guardado = new EventEmitter<void>();
  form!: FormGroup;
  sedes: any[] = [];
  areas: any[] = [];
  usuarios: any[] = [];

  constructor(
    private fb: FormBuilder,
    private sedeService: SedesService,
    private areaService: AreaService,
    private usuarioService: UsuarioService,
    private docsService: DocsService
  ) {}

    ngOnInit(): void {
    this.form = this.fb.group({
      sedeId: [null, Validators.required],
      areaId: [null, Validators.required],
      usuarioId: [null, Validators.required],
      documentoId: [this.documentoId]
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

  trasladar(){
    console.log(this.form);
    console.log(this.form.value);
    if (this.form.invalid) return;
    const data = this.form.value;
    const obs = this.docsService.trasladarDoc(data);

  obs.subscribe((resultado: boolean) => {
    if (resultado) {
      alert("Se trasladó el documento.");
      this.guardado.emit();
      this.cerrar.emit();
    } else {
      alert("No se pudo trasladar el documento.");
    }
  });
  }

}
