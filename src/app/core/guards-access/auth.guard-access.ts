import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Observable, tap } from "rxjs";

import { AuthorizationService } from "../shared/services/authorization.service";

export const AuthGuardService: CanActivateFn = (): Observable<boolean> => {
  const authorizationService: AuthorizationService = inject(AuthorizationService);
  const router: Router = inject(Router);

  return authorizationService.loggedIn$.pipe(
    tap((loggedIn: boolean) => {
      if (!loggedIn) {
        router.navigate(['page-not-found']);
      }
    })
  );
};
