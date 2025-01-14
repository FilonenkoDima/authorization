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

export const routes: Routes = [
  {
    path: '',
    children: [{ path: 'login', component: AuthorizationComponent }, {
      path: 'users',
      component: UsersComponent,
      canActivate: [AdminGuardService, AuthGuardService]
    }, {
      path: 'user-assessments', component: UserAssessmentsComponent, canActivate: [AuthGuardService]
    }, {
      path: 'user-assessments/graph',
      component: UserAssessmentGraphComponent,
      resolve: { graph: resolveUserAssessmentGraph }
    }]
  },
  { path: '**', component: PageNotFoundComponent },
];

