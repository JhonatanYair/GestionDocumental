import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../../models/usuario.model';
import { JwtPayload } from '../../../../models/jwtPayload.model';
import { UsuarioService } from '../../services/usuario.service';
import { DecodedTokenService } from '../../../../services/Decoded/decoded-token.service';
import { UsuarioFormComponent } from '../usuario-form/usuario-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [CommonModule, UsuarioFormComponent, FormsModule, HttpClientModule], 
  templateUrl: './usuario-list.component.html',
  //styleUrls: ['./usuario-list.component.scss']
})
export class UsuarioListComponent implements OnInit {
  usuarios: Usuario[] = [];
  mostrarModal = false;
  usuarioSeleccionado?: Usuario;
  jwtPayload?: JwtPayload;

  constructor(private usuarioService: UsuarioService, private decodedTokenService: DecodedTokenService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.jwtPayload = this.decodedTokenService.decodedToken();
  }

  cargarUsuarios() {
    this.usuarioService.getAll().subscribe(data => this.usuarios = data);
  }

  abrirModal(usuario?: Usuario) {
    this.usuarioSeleccionado = usuario;
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.usuarioSeleccionado = undefined;
  }
}
