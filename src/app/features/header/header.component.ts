import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { map, Observable } from 'rxjs';

import { AuthorizationService } from '../../core/shared/services/authorization.service';
import { RoleType } from '../../core/shared/enums/role.enum';

@Component({
  selector: 'app-header',
  imports: [
    AsyncPipe
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
}
