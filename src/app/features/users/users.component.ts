import { Component, effect, inject, ViewChild } from '@angular/core';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import {
  MatCell,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatNoDataRow,
  MatRow,
  MatTable,
  MatTableDataSource,
  MatTableModule
} from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { UserDataModel } from '../../core/shared/models/user-data.model';
import { UserStore } from '../../core/store/user.store';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-users',
  imports: [
    MatFormField,
    MatInput,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatNoDataRow,
    MatSort,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinner,
  ],
  templateUrl: './users.component.html',
})
export class UsersComponent  {
  usersStore = inject(UserStore);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns!: string[];
  dataSource!: MatTableDataSource<UserDataModel>;

  constructor() {
    console.log(this.usersStore.users());
    effect(() => {
      this.dataSource = new MatTableDataSource(this.usersStore.users());
      this.displayedColumns = Object.keys(this.usersStore.users()[0]) as (keyof UserDataModel)[];
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    // this.httpService.getUsers$().pipe(
    //   takeUntilDestroyed(),
    //   tap((data: UserDataModel[]) => {
    //     this.dataSource = new MatTableDataSource(data);
    //     this.displayedColumns = Object.keys(data[0]) as (keyof UserDataModel)[];
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //   })).subscribe();
  }

  /** paginator method API */
  applyFilter(event: Event) {
    const filterValue: string = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
