import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';

import { AuthorizationService } from "../../authorization/services/authorization.service";
import { PATHS_ROUTES } from '../enums/paths.enum';

export const AuthGuardService: CanActivateFn = (route: ActivatedRouteSnapshot): Observable<boolean> => {
  const authorizationService: AuthorizationService = inject(AuthorizationService);
  const router: Router = inject(Router);

  return authorizationService.loggedIn$.pipe(
    tap(loggedIn => {
      if (!loggedIn) {
        router.navigate([PATHS_ROUTES.AUTH]);
      }
    })
  );
};
