import { Routes } from '@angular/router';

import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { AuthorizationComponent } from './features/authorization/authorization.component';
import { AdminGuardService } from './core/guards-access/admin.guard-access';
import { AuthGuardService } from './core/guards-access/auth.guard-access';
import { PATHS_ROUTES } from './core/enums/paths.enum';
import { UsersViewComponent } from './features/users-view/users-view.component';
import {
  GraphViewComponent
} from './features/user-assessments-view/graph-view/graph-view.component';
import { UserAssessmentsViewComponent } from './features/user-assessments-view/user-assessments-view.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: PATHS_ROUTES.USER_ASSESSMENTS,
    pathMatch: 'full',
  },
  {
    path: PATHS_ROUTES.LOGIN,
    component: AuthorizationComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: PATHS_ROUTES.USERS,
    component: UsersViewComponent,
    canActivate: [AdminGuardService, AuthGuardService]
  },
  {
    path: PATHS_ROUTES.USER_ASSESSMENTS,
    component: UserAssessmentsViewComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: `${PATHS_ROUTES.USER_ASSESSMENTS}/${PATHS_ROUTES.GRAPH}`,
    component: GraphViewComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: PATHS_ROUTES.INVALID_PATH,
    component: PageNotFoundComponent
  },
];

