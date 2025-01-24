import { Component } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

import { UsersAssessmentStore } from '../../core/store/data-store.factory';
import { UserAssessmentsComponent } from './user-assessments/user-assessments.component';

@Component({
  selector: 'app-user-assessments-view',
  imports: [
    MatProgressSpinner,
    UserAssessmentsComponent
  ],
  templateUrl: './user-assessments-view.component.html',
})
export class UserAssessmentsViewComponent {

  userAssessmentStore= new UsersAssessmentStore();

  constructor() {
    this.userAssessmentStore.loadData();
  }
}
