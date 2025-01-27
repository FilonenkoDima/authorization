import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { map, tap } from "rxjs/operators";
import { Observable } from "rxjs";

import { AuthorizationService } from "../../features/authorization/services/authorization.service";
import { RoleType } from '../enums/role.enum';
import { PATHS_ROUTES } from '../enums/paths.enum';

export const AdminGuardService: CanActivateFn = (): Observable<boolean> => {
  const authorizationService: AuthorizationService = inject(AuthorizationService);
  const router: Router = inject(Router);

  return authorizationService.role$.pipe(
    map((role: RoleType) => role === RoleType.ADMIN),
    tap((isAdmin: boolean) => {
      if (!isAdmin) {
        router.navigate([PATHS_ROUTES.USER_ASSESSMENTS]);
      }
    })
  );
};
