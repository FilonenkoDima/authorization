import { AfterViewInit, Component, computed, input, InputSignal, OnInit, Signal, ViewChild } from '@angular/core';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { UserDataModel } from '../../../core/models/user-data.model';
import { CapitalizeFirstPipe } from '../../../core/pipes/capitalizeFirst.pipe';

@Component({
  selector: 'app-users-table',
  imports: [
    MatFormField,
    MatSort,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CapitalizeFirstPipe,
  ],
  templateUrl: './users-table.component.html',
  styles: `
    .table-container {
    height: calc(100vh - var(--nav-height) - var(--input-field-height));
    overflow: auto;
  }

  table {
    width: 100%;
  }`
})
export class UsersTableComponent implements OnInit, AfterViewInit {
  $users: InputSignal<UserDataModel[]> = input.required<UserDataModel[]>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly $displayedColumns: Signal<string[]> = computed(() => {
    const users: UserDataModel[] = this.$users();
    return users.length > 0 ? Object.keys(users[0]) : [];
  });
  readonly $pageSizeOptions: Signal<number[]> = computed(() => {
    const defaultOptions = [5, 10, 25, 50];
    return defaultOptions.filter(option => option <= this.$users().length);
  });

  dataSource!: MatTableDataSource<UserDataModel>;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.$users());
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
    const csvData = this.convertToCSV(this.$users());
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = window.URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'users.csv');
    link.click();
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
