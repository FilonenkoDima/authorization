import { Component, computed, inject, input, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { UserAssessmentModel } from '../../../../core/models/user-assessment.model';
import { AuthorizationService } from '../../../../authorization/services/authorization.service';

@Component({
  selector: 'app-user-assessments',
  imports: [AsyncPipe, MatCardModule, RouterLink, MatPaginator],
  templateUrl: './user-assessments.component.html',
  styles: `.user-assessment-container {
  height: calc(100vh - var(--nav-height));
}`
})
export class UserAssessmentsComponent {
  private readonly authService: AuthorizationService = inject(AuthorizationService);

  userAssessments = input.required<UserAssessmentModel[]>();

  /** Signal to track the current page */
  private currentPageSignal = signal(0);

  /** Slice assessments for pagination using a computed signal */
  pagedAssessments = computed(() => {
    this.totalAssessments = this.userAssessments()?.length ?? 0;
    const startIndex = this.currentPageSignal() * this.pageSize;
    return this.userAssessments()?.slice(startIndex, startIndex + this.pageSize) ?? [];
  });

  isAdmin$ = this.authService.isAdmin$;

  totalAssessments = 0;
  pageSize = 4;
  pageSizeOptions = [4, 8, 12, 20];

  constructor() {
    this.pageSizeOptions = this.generatePageSizeOptions(this.userAssessments?.length ?? 0);
  }

  /** Update the current page signal on page change */
  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPageSignal.set(event.pageIndex);
  }

  private generatePageSizeOptions(length: number): number[] {
    return this.pageSizeOptions.filter((option) => option <= length);
  }
}
