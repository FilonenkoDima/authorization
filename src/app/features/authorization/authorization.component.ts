import { AuthorizationService } from '../../core/shared/services/authorization.service';

import { Component, inject, OnDestroy } from '@angular/core';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { Observable, Subscription } from 'rxjs';

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
  ],
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnDestroy {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private authService: AuthorizationService = inject(AuthorizationService);

  isLoggedIn$: Observable<boolean> = this.authService.loggedIn$;

  private loginSubscription$!: Subscription;

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
