import { Component, inject, input, signal } from '@angular/core';
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
    height: calc(100vh - 6.5rem);
  }`
})
export class UserAssessmentsComponent {
  private readonly authService: AuthorizationService = inject(AuthorizationService);

  userAssessments = input.required<UserAssessmentModel[]>();

  private currentPage = signal<number>(0);
  totalAssessments = signal<number>(this.userAssessments().length);
  pageSize = signal<number>(4);
  pageSizeOptions = signal<number[]>(this.generatePageSizeOptions(this.userAssessments().length));

  pagedAssessments = signal<UserAssessmentModel[]>(
    this.userAssessments().slice(0, this.pageSize())
  );
  isAdmin$ = this.authService.isAdmin$;

  onPageChange(event: PageEvent) {
    this.pageSize.set(event.pageSize);
    this.currentPage.set(event.pageIndex);
    this.updatePagedAssessments();
  }

  private updatePagedAssessments() {
    const assessments = this.userAssessments();
    const page = this.currentPage();
    const pageSize = this.pageSize();
    this.totalAssessments.set(assessments.length);
    const startIndex = page * pageSize;
    this.pagedAssessments.set(assessments.slice(startIndex, startIndex + pageSize));
  }

  private generatePageSizeOptions(length: number): number[] {
    return [4, 8, 12, 20].filter((option) => option <= length);
  }
}
