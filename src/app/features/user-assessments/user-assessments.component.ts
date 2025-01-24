import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

import { UserAssessmentModel } from '../../shared/models/user-assessment.model';
import { RoleType } from '../../shared/enums/role.enum';
import { AuthorizationService } from '../../core/services/authorization.service';
import { UsersAssessmentStore } from '../../core/store/data-store.factory';

@Component({
  selector: 'app-user-assessments',
  imports: [
    AsyncPipe,
    MatCardModule,
    RouterLink,
    MatPaginator,
    MatProgressSpinner
  ],
  templateUrl: './user-assessments.component.html',
})
export class UserAssessmentsComponent {
  private authService = inject(AuthorizationService);

  isAdmin$: Observable<boolean> = this.authService.role$.pipe(map(role => role === RoleType.ADMIN));

  totalAssessments: number = 0;
  pageSize: number = 4;
  userAssessments = new UsersAssessmentStore();

  private userAssessments$ = toObservable(this.userAssessments.data);
  private currentPageSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private currentPage$: Observable<number> = this.currentPageSubject$.asObservable();

  constructor() {
    this.userAssessments.loadData();
  }

  /** slice assessments for pagination */
  pagedAssessments$: Observable<UserAssessmentModel[]> = combineLatest([
    this.userAssessments$,
    this.currentPage$
  ]).pipe(
    map(([assessments, page]) => {
      this.totalAssessments = assessments!.length;
      const startIndex: number = page * this.pageSize;
      return assessments!.slice(startIndex, startIndex + this.pageSize);
    })
  );

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPageSubject$.next(event.pageIndex);
  }
}
