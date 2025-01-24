import { Component, inject } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { UserAssessmentGraphStore } from '../../../../core/store/data-store.factory';
import { UserAssessmentGraphComponent } from './user-assessment-graph/user-assessment-graph.component';

@Component({
  selector: 'app-user-assessment-graph-view',
  imports: [
    MatProgressSpinner,
    UserAssessmentGraphComponent,
  ],
  templateUrl: './user-assessment-graph-view.component.html',
})
export class UserAssessmentGraphViewComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);

  graph = new UserAssessmentGraphStore();

  constructor() {
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((paramMap) => {
      this.graph.loadData(paramMap.get('id')!.toString());
    });
  }
}
