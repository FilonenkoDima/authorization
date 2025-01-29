import { Routes } from '@angular/router';

import { PATHS_ROUTES } from '../core/enums/paths.enum';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { AdminGuardService } from '../core/guards-access/admin.guard-access';
import { UserAssessmentsViewComponent } from './user-assessments-view/user-assessments-view.component';
import { GraphViewComponent } from './graph-view/graph-view.component';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: PATHS_ROUTES.USER_ASSESSMENTS,
    pathMatch: 'full',
  },
  {
    path: PATHS_ROUTES.USERS,
    component: AdminViewComponent,
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
