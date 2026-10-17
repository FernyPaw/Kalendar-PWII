import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { inject } from '@angular/core';
import { Session } from '../../core/services/session';

@Component({
  selector: 'kd-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  menuOpen = true;

 private session = inject(Session);
 private router = inject(Router);

get userRole() {
  return this.session.currentUser?.role ?? 'cliente';
}

get userName() {
  return this.session.currentUser?.name ?? 'Invitado';
}

get username() {
  return this.session.currentUser?.username ?? '';
}

get profileImage() {
  return this.session.currentUser?.profileImage ?? '';
}

  get menuItems() {
    switch (this.userRole) {
      case 'cliente':
        return [
          { label: 'Inicio', route: '/dashboard', icon: '🏠' },
        {
  label: 'Explorar eventos',
  route: '/explorar-eventos', icon: '📅'
},
          { label: 'Favoritos', route: '/favoritos', icon: '♡' },
          { label: 'Mis asistencias', route: '/mis-asistencias', icon: '🎟️' },
          { label: 'Mi perfil', route: '/perfil', icon: '👤' },
        ];

      case 'cafeteria':
        return [
          { label: 'Panel de control', route: '/dashboard', icon: '🏠' },
          { label: 'Mis eventos', route: '/mis-eventos', icon: '📅' },
          { label: 'Asistencias', route: '/asistencias', icon: '🎟️' },
          { label: 'Mi perfil', route: '/perfil', icon: '👤' },
        ];

      case 'admin':
        return [
          { label: 'Panel de control', route: '/dashboard', icon: '🏠' },
          { label: 'Cafeterías', route: '/cafeterias', icon: '☕' },
          { label: 'Mi perfil', route: '/perfil', icon: '👤' },
        ];
    }
  }

 toggleMenu() {
  this.menuOpen = !this.menuOpen;

  document.body.classList.toggle(
    'kd-sidebar-collapsed',
    !this.menuOpen
  );
}
logout(): void {
  this.session.logout();
  this.router.navigate(['/login']);
}
}
