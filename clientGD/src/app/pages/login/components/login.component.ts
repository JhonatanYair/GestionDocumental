import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule, CommonModule, HttpClientModule],
  standalone: true,
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent {
  usuario = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login({ usuario: this.usuario, password: this.password }).subscribe({
      next: (res: any) => {
        this.authService.guardarToken(res.token);
        this.authService.guardarSede(res.sedeId);
        switch (res.rolId) {
          case 1:
            this.router.navigate(['/docs-list']);
            break;
          case 2:
            this.router.navigate(['/docs-list']);
            break;
          case 3:
            this.router.navigate(['/dashboard-radicador']);
            break;
          default:
            this.router.navigate(['/login']); // Si por alguna razón el rol no existe
            break;
        }
      },
      error: (err) => {
        alert('Credenciales incorrectas');
        this.usuario = "";
        this.password = "";
      }
    });
  }
}
