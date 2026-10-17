import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Session } from '../services/session';

export const publishGuard: CanActivateFn = () => {
  const session = inject(Session);
  const router = inject(Router);

  const user = session.currentUser;

  // Solo las cafeterías aprobadas pueden crear contenido.
  if (user?.role === 'cafeteria' && user.cafeStatus === 'approved') {
    return true;
  }

  // Si no ha iniciado sesión, regresar al login.
  if (!user) {
    return router.createUrlTree(['/login']);
  }

  // Los demás usuarios regresan al dashboard.
  return router.createUrlTree(['/dashboard']);
};