import { inject } from '@angular/core';

import { createApiStore } from './data.store';
import { ApiService } from '../services/api.service';
import { UserAssessmentModel } from '../models/user-assessment.model';
import { UserDataModel } from '../models/user-data.model';
import { GraphModel } from '../models/graph-data.model';

const UsersStore = createApiStore<UserDataModel[]>(
  () => inject(ApiService).getUsers$()
);

const UsersAssessmentStore = createApiStore<UserAssessmentModel[]>(
  () => inject(ApiService).getUserAssessments$()
);

const GraphStore = createApiStore<GraphModel, string>(
  (id: string) => inject(ApiService).getUserAssessmentGraph$(id),
  { data: {}, type: '' } as GraphModel
);

export const usersStore = new UsersStore();
export const usersAssessmentStore = new UsersAssessmentStore();
export const graphStore = new GraphStore();
