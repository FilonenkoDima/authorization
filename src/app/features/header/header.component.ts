import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { map, Observable } from 'rxjs';

import { AuthorizationService } from '../../core/services/authorization.service';
import { RoleType } from '../../shared/enums/role.enum';
import { RouterLink } from '@angular/router';
import { PATHS_ROUTES } from '../../shared/enums/paths.enum';

@Component({
  selector: 'app-header',
  imports: [
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private authService:AuthorizationService = inject(AuthorizationService);

  isLoggedIn$: Observable<boolean> = this.authService.loggedIn$;
  isAdmin$: Observable<boolean> = this.authService.role$.pipe(
    map((role: RoleType) => {
      return role === RoleType.ADMIN
    })
  );
  protected readonly PATHS_ROUTES = PATHS_ROUTES;
}
