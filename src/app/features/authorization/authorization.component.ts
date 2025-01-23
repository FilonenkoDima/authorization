import { Component, inject, OnDestroy } from '@angular/core';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { Observable, Subscription } from 'rxjs';

import { AuthorizationService } from '../../core/services/authorization.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  imports: [
    MatFormField,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    AsyncPipe,
    MatIcon,
  ],
})
export class AuthorizationComponent implements OnDestroy {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private authService: AuthorizationService = inject(AuthorizationService);

  isLoggedIn$: Observable<boolean> = this.authService.loggedIn$;

  private loginSubscription$!: Subscription;

  hide = true;
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
        .subscribe(success => {
          if (!success) {
            alert('Login failed');
          }
        });
    }
  }

  onLogout() {
    this.authService.logout();
  }
}
