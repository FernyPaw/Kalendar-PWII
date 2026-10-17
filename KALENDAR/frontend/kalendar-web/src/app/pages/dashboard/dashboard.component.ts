import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CardComponent } from '../../shared/ui/card/card.component';
import { ButtonComponent } from '../../shared/ui/button/button.component'
import { inject } from '@angular/core';
import { Session } from '../../core/services/session';;

interface Publication {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  tag: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, CardComponent, ButtonComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
private session = inject(Session);

  // Estadísticas del administrador
  // Valores temporales hasta conectar la API .NET
  adminStats = {
    totalClientes: 0,
    totalCafeterias: 0,
    cafeteriasPendientes: 0,
    totalEventos: 0,
    totalPublicaciones: 0
  };

  get esAdministrador(): boolean {
    return this.userRole === 'admin';
  }

get showApprovalMessage(): boolean {
  return this.userRole === 'cafeteria'
    && this.cafeStatus === 'approved'
    && !this.session.approvalMessageShown;
}

dismissApprovalMessage(): void {
  this.session.approvalMessageShown = true;
}

get userName(): string {
  return this.session.currentUser?.name ?? 'Invitado';
}

get userRole() {
  return this.session.currentUser?.role ?? null;
}

get cafeStatus() {
  return this.session.currentUser?.cafeStatus ?? null;
}

get canPublish(): boolean {
  return this.userRole === 'cafeteria'
    && this.cafeStatus === 'approved';
}

  // TODO: reemplazar por la llamada real al servicio de publicaciones (API .NET)
  publications: Publication[] = [
    {
      id: 1,
      title: 'Comeback de otono',
      date: '18 sept',
      excerpt: 'Notas para el calendario de lanzamientos de esta semana...',
      tag: 'Evento',
    },
    {
      id: 2,
      title: 'Ideas para el moodboard',
      date: '15 sept',
      excerpt: 'Colores pastel + referencias de fotos para el proximo post.',
      tag: 'Borrador',
    },
    {
      id: 3,
      title: 'Recordatorio de fechas limite',
      date: '10 sept',
      excerpt: 'Checklist de entregas pendientes del mes.',
      tag: 'Tarea',
    },
  ];

  deletePublication(id: number) {
    // TODO: confirmar y llamar al servicio real antes de borrar
    this.publications = this.publications.filter((p) => p.id !== id);
  }
}
