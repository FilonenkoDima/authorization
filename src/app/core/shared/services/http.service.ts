import { API_URL } from '../../../environment/urls.environment';

import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private http: HttpClient = inject(HttpClient);

  getUsers$() {
    return this.http.get<any>(`${API_URL}users`)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          console.log(error);
          return of(false);
        })
      );
  }

  getUserAssessments$() {
    return this.http.get<any>(`${API_URL}userassessments`)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          console.log(error);
          return of(false);
        })
      );
  }

  getUserAssessmentGraph$(userAssessmentId: string): Observable<any> {
    console.log(userAssessmentId);
    return this.http.get<any>(`${API_URL}userassessments/graph?id=${userAssessmentId}`)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          console.log(error);
          return of(false);
        })
      );
  }
}
