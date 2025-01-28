import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

import { API_URL } from '../../environment/urls.environment';
import { GraphModel } from '../models/graph-data.model';
import { UserAssessmentModel } from '../models/user-assessment.model';
import { UserDataModel } from '../models/user-data.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http: HttpClient = inject(HttpClient);

  getUsers$() {
    return this.http.get<UserDataModel[]>(`${API_URL}users`)
      .pipe(
        catchError(error => {
          console.log(error);
          throw new Error(error);
        })
      );
  }

  getUserAssessments$() {
    return this.http.get<UserAssessmentModel[]>(`${API_URL}userassessments`)
      .pipe(
        catchError(error => {
          console.log(error);
          throw new Error(error);
        })
      );
  }

  getUserAssessmentGraph$(userAssessmentId: string): Observable<GraphModel> {
    return this.http.get<GraphModel>(`${API_URL}userassessments/graph?id=${userAssessmentId}`)
      .pipe(
        catchError(error => {
          console.log(error);
          throw new Error(error);
        })
      );
  }
}
