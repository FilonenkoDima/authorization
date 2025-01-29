import { Component, inject } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { UsersTableComponent } from './users-table/users-table.component';
import { UsersStore } from '../../core/store/data-store.factory';

@Component({
  selector: 'app-admin-view',
  imports: [
    UsersTableComponent,
    MatProgressSpinner,
  ],
  templateUrl: './admin-view.component.html',
})
export class AdminViewComponent {
  protected readonly store = inject(UsersStore);

  constructor() {
    this.store.load()
      .pipe(takeUntilDestroyed())
      .subscribe();
  }
}
