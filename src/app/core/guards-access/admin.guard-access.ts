import { AuthorizationService } from "../shared/services/authorization.service";
import { RoleType } from '../shared/enums/role.enum';

import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { map, tap } from "rxjs/operators";
import { Observable } from "rxjs";

export const AdminGuardService: CanActivateFn = (): Observable<boolean> => {
  const authorizationService: AuthorizationService = inject(AuthorizationService);
  const router: Router = inject(Router);

  return authorizationService.role$.pipe(
    map((role: RoleType) => role === RoleType.ADMIN),
    tap((isAdmin: boolean) => {
      if (!isAdmin) {
        router.navigate(['page-not-found']);
      }
    })
  );
};
