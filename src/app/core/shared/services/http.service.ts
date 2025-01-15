import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';

import { API_URL } from '../../../environment/urls.environment';
import { UserAssessmentGraphModel } from '../models/user-assessment-graph-data.model';
import { UserAssessmentModel } from '../models/user-assessment.model';
import { UserDataModel } from '../models/user-data.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private http: HttpClient = inject(HttpClient);

  getUsers$() {
    return this.http.get<UserDataModel[]>(`${API_URL}users`)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          console.log(error);
          throw new Error(error);
        })
      );
  }

  getUserAssessments$() {
    return this.http.get<UserAssessmentModel[]>(`${API_URL}userassessments`)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          console.log(error);
          throw new Error(error);
        })
      );
  }

  getUserAssessmentGraph$(userAssessmentId: string): Observable<UserAssessmentGraphModel> {
    console.log(userAssessmentId);
    return this.http.get<UserAssessmentGraphModel>(`${API_URL}userassessments/graph?id=${userAssessmentId}`)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          console.log(error);
          throw new Error(error);
        })
      );
  }
}
