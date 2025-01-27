import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";

import { AuthorizationService } from "../../authorization/services/authorization.service";

export const AdminGuardService: CanActivateFn = (): Observable<boolean> => {
  const authorizationService: AuthorizationService = inject(AuthorizationService);
  const router: Router = inject(Router);
  return authorizationService.isAdmin$.pipe(
    tap(isAdmin => {
        if (!isAdmin) {
          router.navigate(["../"]);
        }
      }
    ),
  );
};
