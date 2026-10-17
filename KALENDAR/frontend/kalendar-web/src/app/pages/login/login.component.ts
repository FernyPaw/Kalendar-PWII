import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { Session } from '../../core/services/session';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private session = inject(Session);
  
  loading = false;
  showPassword = false;
  errorMessage = '';



form = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
  password: [
    '',
    [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/)
    ]
  ],
});



  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.password;
  }

  
onSubmit() {
  this.errorMessage = '';

  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  this.loading = true;

  setTimeout(() => {
    this.loading = false;

    const email = this.form.controls.email.value?.trim().toLowerCase();

    
    if (email === 'usuario@gamil.com') {
      this.session.currentUser = {
        name: 'LunaKpop',
        username: '@luna_kpop',
        role: 'cliente',
        profileImage: ''
      };

    } else if (email === 'cafeteria@gmail.com') {
      this.session.currentUser = {
        name: 'Café Aurora',
        username: '@cafe_prueba',
        role: 'cafeteria',
        profileImage: '',
        cafeStatus: 'pending'
      };

      } else if (email === 'cafeteria2@gmail.com') {
  this.session.currentUser = {
    name: 'Café Aurora',
    username: '@cafe_2',
    role: 'cafeteria',
    profileImage: '',
    cafeStatus: 'approved'
  };

    } else if (email === 'admin@gmail.com') {
      this.session.currentUser = {
        name: 'Administrador',
        username: '@admin_kalendar',
        role: 'admin',
        profileImage: ''
      };

    } else {
      this.session.currentUser = null;
      this.errorMessage = 'Cuenta no encontrada.';
      return;
    }

    this.router.navigate(['/dashboard']);
  }, 900);
}

}
