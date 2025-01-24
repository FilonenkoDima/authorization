import { Component } from '@angular/core';
import { UsersTableComponent } from './users-table/users-table.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

import { UsersStore } from '../../core/store/data-store.factory';

@Component({
  selector: 'app-users-view',
  imports: [
    UsersTableComponent,
    MatProgressSpinner,
  ],
  templateUrl: './users-view.component.html',
})
export class UsersViewComponent {
  usersStore = new UsersStore();

  constructor() {
    this.usersStore.loadData();
  }
}
