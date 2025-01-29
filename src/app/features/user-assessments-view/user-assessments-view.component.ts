import { Component, inject } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

import { UserAssessmentsTableComponent } from './user-assessments-table/user-assessments-table.component';
import { UsersAssessmentStore } from '../../core/store/data-store.factory';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-assessments-table-view',
  imports: [
    MatProgressSpinner,
    UserAssessmentsTableComponent
  ],
  templateUrl: './user-assessments-view.component.html',
})
export class UserAssessmentsViewComponent {
  protected readonly store = inject(UsersAssessmentStore);

  constructor() {
    this.store.load()
      .pipe(takeUntilDestroyed())
      .subscribe();
  }
}
