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
        this.router.navigate(['/dashboard-admin']);
      },
      error: (err) => {
        alert('Credenciales incorrectas');
      }
    });
  }
}
