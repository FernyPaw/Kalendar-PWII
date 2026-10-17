
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-explorar-eventos',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './explorar-eventos.html',
  styleUrl: './explorar-eventos.css',
})
export class ExplorarEventos {
  busqueda = '';
  filtroActivo = 'todos';

  cambiarFiltro(filtro: string): void {
    this.filtroActivo = filtro;
  }
}
