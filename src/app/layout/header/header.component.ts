import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { map, Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

import { AuthorizationService } from '../../core/services/authorization.service';
import { RoleType } from '../../core/enums/role.enum';
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

  private authService: AuthorizationService = inject(AuthorizationService);

  isLoggedIn$: Observable<boolean> = this.authService.loggedIn$;
  isAdmin$: Observable<boolean> = this.authService.role$.pipe(
    map((role: RoleType) => {
      return role === RoleType.ADMIN
    })
  );

  authorization() {
    if(this.isLoggedIn$) {
      this.authService.logout();
    }
  }
}
