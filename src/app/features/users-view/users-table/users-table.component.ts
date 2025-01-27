import { AfterViewInit, Component, effect, input, OnInit, ViewChild } from '@angular/core';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { UserDataModel } from '../../../core/models/user-data.model';

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
  styles: `
    .table-container {
    height: calc(100vh - 11.25rem);
    overflow: auto;
  }

  table {
    width: 100%;
  }`
})
export class UsersTableComponent implements OnInit, AfterViewInit {
  users = input.required<UserDataModel[]>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns!: string[];
  dataSource!: MatTableDataSource<UserDataModel>;
  pageSizeOptions = [5, 10, 25, 50];

  constructor() {
    effect(() => {
      this.pageSizeOptions = this.generatePageSizeOptions(this.users().length);
    });
  }

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

  downloadCSV() {
    const csvData = this.convertToCSV(this.users());
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = window.URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'users.csv');
    link.click();
  }

  private generatePageSizeOptions(length: number): number[] {
    return this.pageSizeOptions.filter((option) => option <= length);
  }

  private convertToCSV(data: UserDataModel[]): string {
    const headers = Object.keys(data[0]);
    const rows = data.map(row => {
      return headers.map((fieldName: string) => {
        const value = row[fieldName as keyof UserDataModel]; // Явно вказуємо, що поле є частиною UserDataModel
        return JSON.stringify(value, (_, value) => value ?? ''); // Використовуємо значення, якщо воно є
      }).join(',');
    });
    return [headers.join(','), ...rows].join('\n');
  }
}
