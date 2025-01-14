import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';

import { UserAssessmentModel } from '../models/user-assessment.model';
import { HttpService } from '../services/http.service';

export const resolveUserAssessmentGraph: ResolveFn<UserAssessmentModel> = (
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
