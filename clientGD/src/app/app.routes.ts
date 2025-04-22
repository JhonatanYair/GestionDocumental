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
    data: { expectedRole: 1 } 
  },
  {
    path: 'area-list',
    component: AreaListComponent,
    canActivate: [canActivateGuard]
  },
  {
    path: 'radicar-form',
    component: RadicarFormComponent,
    canActivate: [canActivateGuard]
  },
  {
    path: 'usuario-list',
    component: UsuarioListComponent,
    canActivate: [canActivateGuard]
  },
  {
    path: 'dashboard-radicador',
    component: DashboardRadicadorComponent,
    canActivate: [canActivateGuard],
    data: { expectedRole: 3 } 
  },
  {
    path: 'dashboard-gestionador',
    component: DashboardGestionadorComponent,
    canActivate: [canActivateGuard],
    data: { expectedRole: 2 } 
  },
  { path: '**', redirectTo: 'login' },
];
