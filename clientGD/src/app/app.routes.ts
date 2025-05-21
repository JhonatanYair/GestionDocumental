import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/components/login.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { AreaListComponent } from './pages/area/components/area-list/area-list.component';
import { RadicarFormComponent } from './pages/radicar/components/radicar-form/radicar-form.component';
import { canActivateGuard } from './guards/auth.guard';
import { UsuarioListComponent } from './pages/usuario/components/usuario-list/usuario-list.component';
import { DashboardRadicadorComponent } from './pages/dashboard-radicador/dashboard-radicador.component';
import { DashboardGestionadorComponent } from './pages/dashboard-gestionador/dashboard-gestionador.component';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard-admin',
    component: DashboardAdminComponent,
    canActivate: [canActivateGuard],
    data: {allowedRoles: ['Admin'] } // Solo para Admin
  },
  {
    path: 'area-list',
    component: AreaListComponent,
    canActivate: [canActivateGuard],
    data: {allowedRoles: ['Admin'] } // Solo para Admin
  },
  {
    path: 'radicar-form',
    component: RadicarFormComponent,
    canActivate: [canActivateGuard],
    data: {  allowedRoles: ['Admin','Radicador'] } //Admin- radicador
  },
  {
    path: 'usuario-list',
    component: UsuarioListComponent,
    canActivate: [canActivateGuard],
    data: {allowedRoles: ['Admin'] } // Solo para Admin
  },
  {
    path: 'dashboard-radicador',
    component: DashboardRadicadorComponent,
    canActivate: [canActivateGuard],
    data: {  allowedRoles: ['Admin','Radicador']  } // Solo para Admin - radicador
  },
  {
    path: 'dashboard-gestionador',
    component: DashboardGestionadorComponent,
    canActivate: [canActivateGuard],
    data: { allowedRoles: ['Admin','Gestionador']  } // Solo para Admin - gestionador
  },
  { path: '**', redirectTo: 'login' },
];
