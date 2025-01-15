import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';

import { HttpService } from '../services/http.service';
import { UserAssessmentGraphModel } from '../models/user-assessment-graph-data.model';

export const resolveUserAssessmentGraph: ResolveFn<UserAssessmentGraphModel> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const http: HttpService = inject(HttpService);
  const userAssessmentId = activatedRoute.queryParamMap.get('id'); // Використовуємо queryParamMap
  if (!userAssessmentId) {
    throw new Error('User assessment ID is missing');
  }
  return http.getUserAssessmentGraph$(userAssessmentId);
};
