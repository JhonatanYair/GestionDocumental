import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { JwtPayload } from '../models/jwtPayload.model';
import { jwtDecode } from 'jwt-decode';

export const canActivateGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);

  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('token');

    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);
      console.log('ROL DECODED:', decoded.role);

      const rol = decoded.role; // string directamente
      const allowedRoles = route.data['allowedRoles'] as string[] | undefined;

      if (!allowedRoles || allowedRoles.includes(rol)) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    }
  }

  router.navigate(['/login']);
  return false;
};
