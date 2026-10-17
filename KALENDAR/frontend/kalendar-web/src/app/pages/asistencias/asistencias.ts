
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-asistencias',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './asistencias.html',
  styleUrl: './asistencias.css',
})
export class Asistencias {

  
eventos: { id: number; nombre: string }[] = [];

eventoSeleccionado: number | null = null;

get nombreEventoSeleccionado(): string {
  const evento = this.eventos.find(
    e => e.id === this.eventoSeleccionado
  );

  return evento?.nombre ?? '';
}

registros: {
  id: number;
  eventoId: number;
  nombreCliente: string;
  codigo: string;
  asistenciaConfirmada: boolean;
}[] = [];

get registrosEventoSeleccionado() {
  if (this.eventoSeleccionado === null) {
    return [];
  }

  return this.registros.filter(
    registro => registro.eventoId === this.eventoSeleccionado
  );
}
codigoAsistencia = '';
errorCodigo = '';

validarCodigo(): void {
  this.errorCodigo = '';

  if (this.eventoSeleccionado === null) {
    this.errorCodigo = 'Primero selecciona un evento.';
    return;
  }

  if (!this.codigoAsistencia.trim()) {
    this.errorCodigo = 'Ingresa el código de asistencia.';
    return;
  }

  // La comprobación del código se realizará con el backend.
}

}
