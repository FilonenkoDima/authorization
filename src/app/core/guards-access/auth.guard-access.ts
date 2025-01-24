import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Observable, tap } from "rxjs";

import { AuthorizationService } from "../services/authorization.service";
import { PATHS_ROUTES } from '../../shared/enums/paths.enum';

export const AuthGuardService: CanActivateFn = (): Observable<boolean> => {
  const authorizationService: AuthorizationService = inject(AuthorizationService);
  const router: Router = inject(Router);

  return authorizationService.loggedIn$.pipe(
    tap((loggedIn: boolean) => {
      if (!loggedIn) {
        router.navigate([PATHS_ROUTES.LOGIN]);
      }
    })
  );
};
