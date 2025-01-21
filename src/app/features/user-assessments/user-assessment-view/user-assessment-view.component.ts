import { Component, inject } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { UserAssessmentGraphStore } from '../../../core/store/data-store.factory';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { UserAssessmentGraphComponent } from './user-assessment-graph/user-assessment-graph.component';

@Component({
  selector: 'app-user-assessment-view',
  imports: [
    MatProgressSpinner,
    UserAssessmentGraphComponent,
  ],
  templateUrl: './user-assessment-view.component.html',
})
export class UserAssessmentViewComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);

  graph = new UserAssessmentGraphStore();

  constructor() {
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((paramMap) => {
      this.graph.loadData(paramMap.get('id')!.toString());
    });
  }
}
