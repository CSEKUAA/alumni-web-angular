import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { StoreService } from "./store.service";
import { catchError, Observable, tap, throwError } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({providedIn:'root'})

export class MiscService{

    constructor(private httpClient:HttpClient){}

    getCountries():Observable<any>{
        return this.httpClient.get(`${environment.lookup_service}/countries`).pipe(
            catchError(this.handleError)
        )
    }
    
    getDistrictsForCountry(countryName:string):Observable<any>{
        return this.httpClient.get(`${environment.lookup_service}/districts/${countryName}`).pipe(
            catchError(this.handleError)
        )
    }

    getExternalLinkTypes():Observable<any>{
        return this.httpClient.get(`${environment.external_link_service}/type`).pipe(
            catchError(this.handleError)
        )
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