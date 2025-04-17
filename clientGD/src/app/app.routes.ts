import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/components/login.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { AreaListComponent } from './pages/area/components/area-list/area-list.component';
import { RadicarFormComponent } from './pages/radicar/components/radicar-form/radicar-form.component';
import { canActivateGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard-admin',
    component: DashboardAdminComponent,
    canActivate: [canActivateGuard]
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
  { path: '**', redirectTo: 'login' },
];
