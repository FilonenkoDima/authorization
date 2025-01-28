import { Component, inject, input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, map, Observable } from 'rxjs';

import { UserAssessmentModel } from '../../../../core/models/user-assessment.model';
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
  private readonly authService: AuthorizationService = inject(AuthorizationService);

  userAssessments = input.required<UserAssessmentModel[]>();

  private currentPageSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  /** slice assessments for pagination */
  pagedAssessments$: Observable<UserAssessmentModel[]> = this.currentPageSubject$.pipe(
    map((page) => {
      this.totalAssessments = this.userAssessments()?.length ?? 0;
      const startIndex = page * this.pageSize;
      return this.userAssessments().slice(startIndex, startIndex + this.pageSize);
    })
  );
  isAdmin$: Observable<boolean> = this.authService.isAdmin$;

  totalAssessments: number = 0;
  pageSize: number = 4;
  pageSizeOptions: number[] = [4, 8, 12, 20];

  constructor() {
    this.pageSizeOptions = this.generatePageSizeOptions(this.userAssessments?.length ?? 0);
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPageSubject$.next(event.pageIndex);
  }

  private generatePageSizeOptions(length: number): number[] {
    return this.pageSizeOptions.filter((option) => option <= length);
  }
}
