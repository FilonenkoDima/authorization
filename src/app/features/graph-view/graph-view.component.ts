import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { switchMap } from 'rxjs';

import { GraphStore } from '../../core/store/data-store.factory';
import { GraphComponent } from './graph/graph.component';

@Component({
  selector: 'app-graph-view',
  imports: [
    GraphComponent,
    MatProgressSpinner
  ],
  templateUrl: './graph-view.component.html',
})
export class GraphViewComponent {
  protected readonly store = inject(GraphStore);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  constructor() {
    this.route.queryParamMap.pipe(
      takeUntilDestroyed(),
      switchMap((paramMap) => this.store.load(paramMap.get('id')!.toString()))
    ).subscribe();
  }
}
