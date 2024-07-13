import { Injectable } from "@angular/core";
import { LoginDTO, RegistrationDTO } from "../models/auth.models";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";

@Injectable()

export class AuthService{
    private apiRegistration:string = 'http://5.189.128.185:8080/api/alumni';
    private apiLogin:string = 'http://5.189.128.185:8080/api/auth/login';

    constructor(private httpClient:HttpClient){}

    registerAlumni(userData: any): Observable<any> {
        return this.httpClient.post<any>(this.apiRegistration, userData)
          .pipe(
            catchError(this.handleError)
          );
    }

    login(model:LoginDTO): Observable<any>{
        return this.httpClient.post<any>(this.apiLogin, model)
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