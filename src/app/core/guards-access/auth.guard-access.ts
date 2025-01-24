import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router } from "@angular/router";
import { Observable, map } from "rxjs";

import { AuthorizationService } from "../services/authorization.service";
import { PATHS_ROUTES } from '../../shared/enums/paths.enum';

export const AuthGuardService: CanActivateFn = (route: ActivatedRouteSnapshot): Observable<boolean> => {
  const authorizationService: AuthorizationService = inject(AuthorizationService);
  const router: Router = inject(Router);

  return authorizationService.loggedIn$.pipe(
    map((loggedIn: boolean) => {
      if (loggedIn && route.routeConfig?.path === PATHS_ROUTES.LOGIN) {
        console.log("User is logged in, redirecting to home.");
        router.navigate(['/']);
        return false;
      }
      if (!loggedIn && route.routeConfig?.path !== PATHS_ROUTES.LOGIN) {
        console.log("User is not logged in, redirecting to login.");
        router.navigate([PATHS_ROUTES.LOGIN]);
        return false;
      }
      return true;
    })
  );
};
