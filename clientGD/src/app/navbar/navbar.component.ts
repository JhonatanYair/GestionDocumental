import { RouterModule, Router } from '@angular/router';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { JwtPayload } from '../models/jwtPayload.model';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [FormsModule, ReactiveFormsModule,CommonModule,RouterModule],
  
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  decoded?: JwtPayload;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token: string | null = localStorage.getItem('token');
      if (token) {
        this.decoded = jwtDecode<JwtPayload>(token);
        console.log(this.decoded);
      } else {
        console.warn('No se encontró el token en localStorage');
      }
    } else {
      console.warn('localStorage no está disponible (no es el navegador)');
    }
  }

  cerrarSesion(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
    this.router.navigate(['/login']);
  }
}
