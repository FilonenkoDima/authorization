import { AfterViewInit, Component, input, OnInit, ViewChild } from '@angular/core';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { UserDataModel } from '../../../shared/models/user-data.model';

@Component({
  selector: 'app-users-table',
  imports: [
    MatFormField,
    MatInput,
    MatSort,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './users-table.component.html',
})
export class UsersTableComponent implements OnInit, AfterViewInit {
  users = input.required<UserDataModel[]>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns!: string[];
  dataSource!: MatTableDataSource<UserDataModel>;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.users());
    this.displayedColumns = Object.keys(this.users()[0]) as (keyof UserDataModel)[];
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
