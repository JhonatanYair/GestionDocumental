import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Documento } from '../../../../models/docs.model';
import { DocsService } from '../../services/docs.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-docs-parameter',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './docs-parameter.component.html',
  styleUrls: ['./docs-parameter.component.css']
})
export class DocsParameterComponent implements OnInit {
  @Input() docParameter?: Documento;
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardado = new EventEmitter<void>();

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private docsService: DocsService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombreDoc: [this.docParameter?.nombre || '', Validators.required],
      NumDays: [this.docParameter?.tiempoRespuestaDias || 0, Validators.required],
      documentoId: [this.docParameter?.documentoId]
    });
  }


  parametrizar(){
    if (this.form.invalid) return;

    const data = this.form.value;
    const obs = this.docsService.ParametrizarDoc(data);

    obs.subscribe(() => {
      alert("Se ha guardado, exitosamente.")
      this.guardado.emit();
      this.cerrar.emit();
    });
  }

}