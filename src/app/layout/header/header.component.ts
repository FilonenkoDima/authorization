import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

import { AuthorizationService } from '../../authorization/services/authorization.service';
import { PATHS_ROUTES } from '../../core/enums/paths.enum';

@Component({
  selector: 'app-header',
  imports: [
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  protected readonly PATHS_ROUTES = PATHS_ROUTES;

  private readonly authService: AuthorizationService = inject(AuthorizationService);

  isLoggedIn$: Observable<boolean> = this.authService.loggedIn$;
  isAdmin$: Observable<boolean> = this.authService.isAdmin$;

  authorization() {
    if(this.isLoggedIn$) {
      this.authService.logout();
    }
  }
}
