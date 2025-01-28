import { Component } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

import { UsersTableComponent } from './users-table/users-table.component';
import { usersStore } from '../../../core/store/data-store.factory';

@Component({
  selector: 'app-users-view',
  imports: [
    UsersTableComponent,
    MatProgressSpinner,
  ],
  templateUrl: './users-view.component.html',
})
export class UsersViewComponent {
  protected readonly usersStore = usersStore;

  constructor() {
    usersStore.loadData();
  }
}
