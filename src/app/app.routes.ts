import { Routes } from '@angular/router';

import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';
import { AuthorizationComponent } from './features/authorization/authorization.component';
import { UsersComponent } from './features/users/users.component';
import { AdminGuardService } from './core/guards-access/admin.guard-access';
import { AuthGuardService } from './core/guards-access/auth.guard-access';
import { UserAssessmentsComponent } from './features/user-assessments/user-assessments.component';
import { resolveUserAssessmentGraph } from './core/shared/resolvers/user-assessment-graph.resolver';
import {
  UserAssessmentGraphComponent
} from './features/user-assessments/user-assessment-graph/user-assessment-graph.component';
import { PATHS_ROUTES } from './core/shared/enums/paths.enum';

export const routes: Routes = [
  {
    path: '',
    children: [{ path: PATHS_ROUTES.LOGIN, component: AuthorizationComponent }, {
      path: PATHS_ROUTES.USERS,
      component: UsersComponent,
      canActivate: [AdminGuardService, AuthGuardService]
    }, {
      path: PATHS_ROUTES.USER_ASSESSMENTS, component: UserAssessmentsComponent, canActivate: [AuthGuardService]
    }, {
      path: `${PATHS_ROUTES.USER_ASSESSMENTS}/${PATHS_ROUTES.GRAPH}`,
      component: UserAssessmentGraphComponent,
      resolve: { graph: resolveUserAssessmentGraph }
    }]
  },
  { path: PATHS_ROUTES.INVALID_PATH, component: PageNotFoundComponent },
];

