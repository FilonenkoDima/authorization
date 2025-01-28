import { Component, inject } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { graphStore } from '../../../../core/store/data-store.factory';
import { GraphComponent } from './graph/graph.component';

@Component({
  selector: 'app-graph-view',
  imports: [MatProgressSpinner, GraphComponent],
  templateUrl: './graph-view.component.html',
})
export class GraphViewComponent {
  protected readonly graphStore = graphStore;

  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  constructor() {
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((paramMap) => {
      graphStore.loadData(paramMap.get('id')!.toString());
    });
  }
}
