
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-cafeterias',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './cafeterias.html',
  styleUrl: './cafeterias.css',
})
export class Cafeterias {
  filtroActivo = 'todas';

  cambiarFiltro(filtro: string): void {
    this.filtroActivo = filtro;
  }
}
