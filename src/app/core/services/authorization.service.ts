import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { API_URL } from '../../environment/urls.environment';
import { RoleType } from '../enums/role.enum';
import { LoginModel } from '../models/login.model';
import { LoginResponseModel } from '../models/login-response.model';
import { PATHS_ROUTES } from '../enums/paths.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private http: HttpClient = inject(HttpClient);
  private cookieService: CookieService = inject(CookieService);
  private readonly router = inject(Router);

  private loggedInSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.cookieService.check('JWT_Token'));
  private roleSubject$: BehaviorSubject<RoleType> = new BehaviorSubject<RoleType>(this.cookieService.get('ROLE') as RoleType);

  loggedIn$: Observable<boolean> = this.loggedInSubject$.asObservable();
  role$: Observable<RoleType> = this.roleSubject$.asObservable();

  authorization() {
    if (this.loggedInSubject$.value) {
      this.logout();
    }
    this.router.navigate([PATHS_ROUTES.LOGIN]);
  }

  /** @return return true if success auth */
  login$(userDetails: LoginModel): Observable<boolean> {
    return this.http.post<LoginResponseModel>(`${API_URL}login`, userDetails)
      .pipe(
        map(response => {
          this.cookieService.set('JWT_Token', response.token, { expires: 2 });
          this.cookieService.set('ROLE', response.role.toUpperCase());
          this.roleSubject$.next(response.role.toUpperCase() as RoleType);
          this.loggedInSubject$.next(true);
          this.router.navigate([PATHS_ROUTES.USER_ASSESSMENTS]);
          return true;
        }),
        catchError(error => {
          console.log(error);
          return of(false);
        })
      );
  }

  logout(): void {
    this.cookieService.delete('JWT_Token');
    this.loggedInSubject$.next(false);
    this.cookieService.set('ROLE', RoleType.UNAUTHORIZED);
    this.roleSubject$.next(RoleType.UNAUTHORIZED);
  }
}
