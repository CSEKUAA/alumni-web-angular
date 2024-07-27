import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({
    providedIn:'root'
})

export class UserService{

    constructor(private httpClient:HttpClient){}

    getUserProfile():Observable<any>{
        return this.httpClient.get(`${environment.user_management_service}/user-info`)
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
        return throwError(()=> new Error(errorMessage));
    }
}