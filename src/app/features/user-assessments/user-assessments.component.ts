import { HttpService } from '../../core/shared/services/http.service';
import { UserAssessmentModel } from '../../core/shared/models/user-assessment.model';

import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

@Component({
  selector: 'app-user-assessments',
  imports: [
    AsyncPipe,
    MatCardModule,
    RouterLink,
    MatPaginator
  ],
  templateUrl: './user-assessments.component.html',
  styleUrl: './user-assessments.component.css'
})
export class UserAssessmentsComponent {
  private httpService: HttpService = inject(HttpService);
  private userAssessments$: Observable<UserAssessmentModel[]> = this.httpService.getUserAssessments$();
  private currentPageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private currentPage$: Observable<number> = this.currentPageSubject.asObservable();

  totalAssessments: number = 0;
  pageSize: number = 4;

  pagedAssessments$: Observable<UserAssessmentModel[]> = combineLatest([
    this.userAssessments$,
    this.currentPage$
  ]).pipe(
    map(([assessments, page]) => {
      this.totalAssessments = assessments.length;
      const startIndex: number = page * this.pageSize;
      return assessments.slice(startIndex, startIndex + this.pageSize);
    })
  );

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPageSubject.next(event.pageIndex);
  }
}
