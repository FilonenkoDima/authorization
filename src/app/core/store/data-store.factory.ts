import { Injector } from '@angular/core';

import { createApiStore } from './data.store';
import { ApiService } from '../services/api.service';
import { UserAssessmentModel } from '../models/user-assessment.model';
import { UserDataModel } from '../models/user-data.model';
import { GraphModel } from '../models/graph-data.model';

export const UsersStore = createApiStore(
  (params: void, injector: Injector) =>
    injector.get(ApiService).getUsers$(),
  [] as UserDataModel[]
);

export const UsersAssessmentStore = createApiStore(
  (params: void, injector: Injector) =>
    injector.get(ApiService).getUserAssessments$(),
  [] as UserAssessmentModel[]
);

export const GraphStore = createApiStore(
  (params: string, injector: Injector) =>
    injector.get(ApiService).getGraph$(params),
  {} as GraphModel
);
