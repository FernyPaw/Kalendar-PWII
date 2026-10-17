import { Routes } from '@angular/router';
import { publishGuard } from './core/guards/publish-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    // TODO: agregar canActivate: [authGuard] cuando tengamos el servicio de auth
  },
  {
  path: 'mis-eventos',
  loadComponent: () =>
    import('./pages/mis-eventos/mis-eventos')
      .then(m => m.MisEventos),
},

{
  path: 'asistencias',
  loadComponent: () =>
    import('./pages/asistencias/asistencias')
      .then(m => m.Asistencias)
},

  {
    path: 'perfil',
    loadComponent: () =>
      import('./pages/perfil/perfil.component').then((m) => m.PerfilComponent),
  },
  {
  path: 'crear',
  canActivate: [publishGuard],
  loadComponent: () =>
    import('./pages/create/create.component').then((m) => m.CreateComponent),
},
 
{
  path: 'publicaciones',
  loadComponent: () =>
    import('./pages/publicaciones/publicaciones')
      .then(m => m.Publicaciones)
},
{
  path: 'cafeterias',
  loadComponent: () =>
    import('./pages/cafeterias/cafeterias')
      .then(m => m.Cafeterias)
},


{
  path: 'explorar-eventos',
  loadComponent: () =>
    import('./pages/explorar-eventos/explorar-eventos')
      .then(m => m.ExplorarEventos)
},

{
  path: 'favoritos',
  loadComponent: () =>
    import('./pages/favoritos/favoritos')
      .then(m => m.Favoritos)
},


{
  path: 'mis-asistencias',
  loadComponent: () =>
    import('./pages/mis-asistencias/mis-asistencias')
      .then(m => m.MisAsistencias)
},


{ path: '**', redirectTo: 'login' },


];
