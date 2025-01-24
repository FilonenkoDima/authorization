import { inject } from '@angular/core';
import { createApiStore } from './data.store';
import { HttpService } from '../services/http.service';
import { UserAssessmentModel } from '../../shared/models/user-assessment.model';
import { UserDataModel } from '../../shared/models/user-data.model';
import { UserAssessmentGraphModel } from '../../shared/models/user-assessment-graph-data.model';

export const UsersStore = createApiStore<UserDataModel[]>(
  () => inject(HttpService).getUsers$()
);

export const UsersAssessmentStore = createApiStore<UserAssessmentModel[]>(
  () => inject(HttpService).getUserAssessments$()
);

export const UserAssessmentGraphStore = createApiStore<UserAssessmentGraphModel, string>(
  (id: string) => inject(HttpService).getUserAssessmentGraph$(id),
  { data: {}, type: '' } as UserAssessmentGraphModel
);
