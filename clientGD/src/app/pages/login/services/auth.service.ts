import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { usuario: string; password: string }) {
    return this.http.post(`/api/Usuario/GetLogin`, credentials);
  }

  guardarToken(token: string) {
    localStorage.setItem('token', token);
  }

  guardarSede(sede: string) {
    localStorage.setItem('sede', sede);
  }

  estaAutenticado(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
