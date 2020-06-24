import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private API_URL = "http://localhost:3000";
  constructor(private http: HttpClient) { }

  register(data: any) {
    return this.http.post<any>(this.API_URL + "/register", data).pipe(
      retry(1),
      catchError(this.handleError)
  );
  }

  getUsers() {
    return this.http.get<any>(this.API_URL + "/register").pipe(
      retry(1),
      catchError(this.handleError)
  );
  }

  login() {
    return this.http.get<any>(this.API_URL + "/register").pipe(
      retry(1),
      catchError(this.handleError)
  );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${error.error.message}`;
    } else {
        // server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
}
}
