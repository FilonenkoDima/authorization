import { inject } from '@angular/core';

import { createApiStore } from './data.store';
import { ApiService } from '../services/api.service';
import { UserAssessmentModel } from '../models/user-assessment.model';
import { UserDataModel } from '../models/user-data.model';
import { UserAssessmentGraphModel } from '../models/user-assessment-graph-data.model';

export const UsersStore = createApiStore<UserDataModel[]>(
  () => inject(ApiService).getUsers$()
);

export const UsersAssessmentStore = createApiStore<UserAssessmentModel[]>(
  () => inject(ApiService).getUserAssessments$()
);

export const UserAssessmentGraphStore = createApiStore<UserAssessmentGraphModel, string>(
  (id: string) => inject(ApiService).getUserAssessmentGraph$(id),
  { data: {}, type: '' } as UserAssessmentGraphModel
);
