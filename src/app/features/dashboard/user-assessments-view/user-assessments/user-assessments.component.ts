import { Component, effect, inject, input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

import { UserAssessmentModel } from '../../../../core/models/user-assessment.model';
import { RoleType } from '../../../../core/enums/role.enum';
import { AuthorizationService } from '../../../../authorization/services/authorization.service';

@Component({
  selector: 'app-user-assessments',
  imports: [AsyncPipe, MatCardModule, RouterLink, MatPaginator],
  templateUrl: './user-assessments.component.html',
  styles: `.user-assessment-container {
    height: calc(100vh - 6.5rem);
  }`
})
export class UserAssessmentsComponent {
  private authService = inject(AuthorizationService);

  userAssessments = input.required<UserAssessmentModel[]>();

  private userAssessments$ = toObservable(this.userAssessments);
  private currentPageSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private currentPage$: Observable<number> = this.currentPageSubject$.asObservable();

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
  isAdmin$: Observable<boolean> = this.authService.role$.pipe(map(role => role === RoleType.ADMIN));

  totalAssessments: number = 0;
  pageSize: number = 4;
  pageSizeOptions = [4, 8, 12, 20];

  constructor() {
    effect(() => {
      this.pageSizeOptions = this.generatePageSizeOptions(this.userAssessments().length);
    });
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPageSubject$.next(event.pageIndex);
  }

  private generatePageSizeOptions(length: number): number[] {
    return this.pageSizeOptions.filter((option) => option <= length);
  }
}
