import { Routes } from '@angular/router';

import { PATHS_ROUTES } from '../core/enums/paths.enum';
import { UsersViewComponent } from './dashboard/users-view/users-view.component';
import { AdminGuardService } from '../core/guards-access/admin.guard-access';
import { UserAssessmentsViewComponent } from './dashboard/user-assessments-view/user-assessments-view.component';
import { GraphViewComponent } from './dashboard/user-assessments-view/graph-view/graph-view.component';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: PATHS_ROUTES.USER_ASSESSMENTS,
    pathMatch: 'full',
  },
  {
    path: PATHS_ROUTES.USERS,
    component: UsersViewComponent,
    canActivate: [AdminGuardService]
  },
  {
    path: PATHS_ROUTES.USER_ASSESSMENTS,
    component: UserAssessmentsViewComponent
  },
  {
    path: `${PATHS_ROUTES.USER_ASSESSMENTS}/${PATHS_ROUTES.GRAPH}`,
    component: GraphViewComponent
  }
]
