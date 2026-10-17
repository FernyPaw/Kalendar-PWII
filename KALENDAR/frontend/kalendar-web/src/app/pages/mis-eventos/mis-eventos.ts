
import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { Session } from '../../core/services/session';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-mis-eventos',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ReactiveFormsModule],
  templateUrl: './mis-eventos.html',
  styleUrl: './mis-eventos.css',
})
export class MisEventos {
  mostrarFormulario = false;
  
eventos = [
  {
    id: 1,
    nombre: 'BTS Night',
    fecha: '2026-10-24',
    fechaPublicacion: '2026-10-17',
    hora: '18:00',
    precio: 150,
    estado: 'Publicado'
  },
  {
    id: 2,
    nombre: 'Tarde de K-pop',
    fecha: '2026-10-20',
    fechaPublicacion: '2026-10-15',
    hora: '16:00',
    precio: 0,
    estado: 'Publicado'
  },
  {
    id: 3,
    nombre: 'Coffee & Music',
    fecha: '2026-10-12',
    fechaPublicacion: '2026-10-10',
    hora: '17:00',
    precio: 80,
    estado: 'Finalizado'
  }
];

  pasoActual = 1;


siguientePaso(): void {
  if (this.pasoActual === 1) {
    this.eventoForm.markAllAsTouched();

    if (
      this.eventoForm.invalid ||
      this.horarioInvalido ||
      this.eventoForm.controls.fecha.value < this.fechaMinima
    ) {
      return;
    }
  }

  if (this.pasoActual < 4) {
    this.pasoActual++;
  }
}


pasoAnterior(): void {
  if (this.pasoActual > 1) {
    this.pasoActual--;
  }
}

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
  }
  private session = inject(Session);

get puedeCrearEvento(): boolean {
  return (
    this.session.currentUser?.role === 'cafeteria' &&
    this.session.currentUser?.cafeStatus === 'approved'
  );
}

get fechaMinima(): string {
  const hoy = new Date();

  const anio = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const dia = String(hoy.getDate()).padStart(2, '0');

  return `${anio}-${mes}-${dia}`;
}


get horarioInvalido(): boolean {
  const inicio = this.eventoForm.controls.horaInicio.value;
  const fin = this.eventoForm.controls.horaFin.value;

  if (!inicio || !fin) {
    return false;
  }

  return fin <= inicio;
}


private fb = inject(FormBuilder);

eventoForm = this.fb.nonNullable.group({
  nombre: ['', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(100)
  ]],

  artista: ['', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(100)
  ]],

  descripcion: ['', [
    Validators.required,
    Validators.minLength(20),
    Validators.maxLength(1000)
  ]],
  fecha: ['', Validators.required],

horaInicio: ['', Validators.required],

horaFin: ['', Validators.required],

tipoEntrada: ['gratis', Validators.required],
precioEntrada: [0, [Validators.required, Validators.min(0.01)]]

});

}
