import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CardComponent } from '../../shared/ui/card/card.component';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { Session } from '../../core/services/session';
@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, CardComponent, ButtonComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent {
  private fb = inject(FormBuilder);

private session = inject(Session);

mostrarFormularioPublicacion = false;

get esCafeteria(): boolean {
  return this.session.currentUser?.role === 'cafeteria';
}

get puedePublicar(): boolean {
  return (
    this.esCafeteria &&
    this.session.currentUser?.cafeStatus === 'approved'
  );
}

toggleFormularioPublicacion(): void {
  if (!this.puedePublicar) {
    return;
  }

  this.mostrarFormularioPublicacion =
    !this.mostrarFormularioPublicacion;
}

  saving = false;
  saved = false;

  // TODO: reemplazar por los datos reales del usuario autenticado
  form = this.fb.group({
    name: ['Amy', [Validators.required, Validators.minLength(2)]],
    email: ['amy@correo.com', [Validators.required, Validators.email]],
    bio: ['Diseñando y programando Kalendar ♡', [Validators.maxLength(160)]],
  });

  get name() {
    return this.form.controls.name;
  }

  get email() {
    return this.form.controls.email;
  }

  get initials(): string {
    const value = this.name.value || '';
    return value
      .trim()
      .split(/\s+/)
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.saved = false;

    // TODO: reemplazar por la llamada real al servicio de usuario (API .NET)
    setTimeout(() => {
      this.saving = false;
      this.saved = true;
      console.log('Perfil actualizado:', this.form.value);
    }, 800);
  }
}
