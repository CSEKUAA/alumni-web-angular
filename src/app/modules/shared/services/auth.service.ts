import { Injectable } from "@angular/core";
import { LoginDTO, RegistrationDTO } from "../../auth/models/auth.models";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn:'root'
})

export class AuthService{
    
    constructor(private httpClient:HttpClient){}

    registerAlumni(userData: any): Observable<any> {
        return this.httpClient.post<any>(`${environment.user_management_service}/register`, userData)
          .pipe(
            catchError(this.handleError)
          );
    }

    login(model:LoginDTO): Observable<any>{
        return this.httpClient.post<any>(`${environment.authentication_service}/login`, model)
          .pipe(
            catchError(this.handleError)
          );
    }
    
    private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
        // Client-side or network error
        errorMessage = `Error: ${error.error.message}`;
    } else {
        // Backend error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
    }
}