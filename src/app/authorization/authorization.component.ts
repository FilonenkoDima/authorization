import { Component, DestroyRef, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatCard } from '@angular/material/card';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs/operators';

import { AuthorizationService } from './services/authorization.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  imports: [MatInputModule, ReactiveFormsModule, MatFormFieldModule, FormsModule, MatIcon, MatCard,],
})
export default class AuthorizationComponent {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly authService: AuthorizationService = inject(AuthorizationService);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  hide: boolean = true;
  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onLogin() {
    if (this.form.valid) {
      this.authService
        .login$({ email: this.form.value.email!, password: this.form.value.password! })
        .pipe(tap(() => {
          takeUntilDestroyed(this.destroyRef);
        }))
        .subscribe(success => {
          if (!success) {
            alert('Login failed');
          }
        });
    }
  }
}
