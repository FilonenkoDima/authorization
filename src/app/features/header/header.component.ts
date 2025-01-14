import { AuthorizationService } from '../../core/shared/services/authorization.service';
import { RoleType } from '../../core/shared/enums/role.enum';

import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [
    AsyncPipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private authService:AuthorizationService = inject(AuthorizationService);

  isLoggedIn$: Observable<boolean> = this.authService.loggedIn$;
  isAdmin$: Observable<boolean> = this.authService.role$.pipe(
    map((role: RoleType) => {
      console.log('role - ' + role);
      console.log('RoleType - ' + RoleType.ADMIN)
      return role === RoleType.ADMIN
    })
  );
}
