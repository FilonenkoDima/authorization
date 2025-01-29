import { Routes } from '@angular/router';

import { AuthGuardService } from './core/guards-access/auth.guard-access';
import { PATHS_ROUTES } from './core/enums/paths.enum';

export const routes: Routes = [
  {
    path: '',
    redirectTo: PATHS_ROUTES.DASHBOARD,
    pathMatch: 'full',
  },
  {
    path: PATHS_ROUTES.DASHBOARD,
    loadChildren: () => import('./features/features.routes').then((r) => r.ROUTES),
    canActivate: [AuthGuardService],
  },
  {
    path: PATHS_ROUTES.AUTH,
    loadChildren: () => import('../app/authorization/auth.routes').then((r) => r.ROUTES),
  },
  {
    path: PATHS_ROUTES.INVALID_PATH,
    redirectTo: PATHS_ROUTES.DASHBOARD,
  },
];

