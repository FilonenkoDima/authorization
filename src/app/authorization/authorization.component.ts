import { Component, DestroyRef, inject, OnDestroy } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { MatCard } from '@angular/material/card';

import { AuthorizationService } from './services/authorization.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  imports: [MatInputModule, ReactiveFormsModule, MatFormFieldModule, FormsModule, MatIcon, MatCard,],
})
export class AuthorizationComponent implements OnDestroy {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly authService: AuthorizationService = inject(AuthorizationService);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  private loginSubscription$!: Subscription;

  hide: boolean = true;
  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  ngOnDestroy() {
    this.loginSubscription$.unsubscribe();
  }

  onLogin() {
    if (this.form.valid) {
      this.loginSubscription$ = this.authService
        .login$({ email: this.form.value.email!, password: this.form.value.password! })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(success => {
          if (!success) {
            alert('Login failed');
          }
        });
    }
  }
}
