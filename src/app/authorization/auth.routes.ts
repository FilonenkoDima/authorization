import { Routes } from '@angular/router';

import { PATHS_ROUTES } from '../core/enums/paths.enum';
import { AuthorizationComponent } from './authorization.component';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: PATHS_ROUTES.LOGIN,
    pathMatch: 'full',
  },
  {
    path: PATHS_ROUTES.LOGIN,
    component: AuthorizationComponent,
  }
]
