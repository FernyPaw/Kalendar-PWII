import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/ui/button/button.component';

function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirm = control.get('confirmPassword')?.value;
    return password && confirm && password !== confirm ? { passwordMismatch: true } : null;
  };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ButtonComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  loading = false;
  showPassword = false;
  errorMessage = '';

form = this.fb.group(
  {
   accountType: ['cliente', [Validators.required]],
name: ['', [Validators.required, Validators.minLength(2)]],
username: ['', [
  Validators.required,
  Validators.minLength(3),
  Validators.maxLength(20),
  Validators.pattern(/^[a-zA-Z0-9_]+$/)
]],
rfc: ['', [
  Validators.pattern(/^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/i)
]],

phone: ['', [
  Validators.pattern(/^[0-9]{10}$/)
]],

email: ['', [
  Validators.required,
  Validators.email
]],

password: ['', [
  Validators.required,
  Validators.minLength(8),
  Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,}$/)
]],

confirmPassword: ['', [
  Validators.required
]],
   
  },
  { validators: passwordsMatchValidator() },
);

updateRfcValidation() {
  const accountType = this.form.controls.accountType.value;
  const rfc = this.form.controls.rfc;

  if (accountType === 'cafeteria') {
    rfc.setValidators([
      Validators.required,
      Validators.pattern(/^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/i)
    ]);
  } else {
    rfc.clearValidators();
    rfc.reset('');
  }

  rfc.updateValueAndValidity();
}
updatePhoneValidation() {
  const accountType = this.form.controls.accountType.value;
  const phone = this.form.controls.phone;

  if (accountType === 'cafeteria') {
    phone.setValidators([
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/)
    ]);
  } else {
    phone.clearValidators();
    phone.reset('');
  }

  phone.updateValueAndValidity();
}
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  get name() {
    return this.form.controls.name;
  }

  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.password;
  }

  get confirmPassword() {
    return this.form.controls.confirmPassword;
  }

  onSubmit() {
    this.errorMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      if (this.form.errors?.['passwordMismatch']) {
        this.errorMessage = 'Las contraseñas no coinciden.';
      }
      return;
    }

    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      console.log('Register payload:', this.form.value);
      this.router.navigate(['/dashboard']);
    }, 900);
  }
}
