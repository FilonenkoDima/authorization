import { Routes } from '@angular/router';

import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';
import { AuthorizationComponent } from './features/authorization/authorization.component';
import { AdminGuardService } from './core/guards-access/admin.guard-access';
import { AuthGuardService } from './core/guards-access/auth.guard-access';
import { UserAssessmentsComponent } from './features/user-assessments/user-assessments.component';
import { PATHS_ROUTES } from './shared/enums/paths.enum';
import { UsersViewComponent } from './features/users-view/users-view.component';
import {
  UserAssessmentViewComponent
} from './features/user-assessments/user-assessment-view/user-assessment-view.component';

export const routes: Routes = [
  {
    path: '',
    children: [{ path: PATHS_ROUTES.LOGIN, component: AuthorizationComponent }, {
      path: PATHS_ROUTES.USERS,
      component: UsersViewComponent,
      canActivate: [AdminGuardService, AuthGuardService]
    }, {
      path: PATHS_ROUTES.USER_ASSESSMENTS, component: UserAssessmentsComponent, canActivate: [AuthGuardService]
    }, {
      path: `${PATHS_ROUTES.USER_ASSESSMENTS}/${PATHS_ROUTES.GRAPH}`,
      component: UserAssessmentViewComponent,
    }]
  },
  { path: PATHS_ROUTES.INVALID_PATH, component: PageNotFoundComponent },
];

