import { Injectable } from "@angular/core";
import { LoginDTO, RegistrationDTO } from "../../auth/models/auth.models";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, catchError, Observable, of, switchMap, tap, throwError } from "rxjs";
import { environment } from "../../../../environments/environment";
import { StoreService } from "./store.service";
import { LoginResponseDTO } from "../models/api.response";

@Injectable({
  providedIn:'root'
})

export class IdentityService{
  private refreshTokenTimeout!:any;
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    
  constructor(private httpClient:HttpClient, private store:StoreService){}

  registerAlumni(userData: RegistrationDTO): Observable<any> {
      return this.httpClient.post<any>(`${environment.user_management_service}/register`, userData)
        .pipe(
          catchError(this.handleError)
        );
  }

  login(model:LoginDTO): Observable<any>{
      return this.httpClient.post<any>(`${environment.authentication_service}/login`, model)
        .pipe(
          tap((resp:LoginResponseDTO)=>{
            this.storeTokens(resp);
          }),
          catchError(this.handleError),
        );
  }

  logout(): Observable<any> {
    return this.httpClient.post<any>(`${environment.authentication_service}/logout`,{})
      .pipe(
        tap(()=>{          
          this.store.clearLoginInfo();
          clearTimeout(this.refreshTokenTimeout);
        }),
        catchError(this.handleError),
      );
  }

  hasValidAccessToken(): boolean{
    let tokenExpiary=this.store.getTokenExpiary();
    let accessToken=this.store.getAccessToken();
    if(tokenExpiary && accessToken){
      let expDate = new Date(tokenExpiary);
      if(this.getTimeDifferenceInMinutes(expDate, new Date())>=0){
        this.scheduleRefreshToken();
        return true;
      }
    }

    return false;
  }

  scheduleRefreshToken(): void {
    const accessToken = this.store.getAccessToken();
    if (!accessToken) return;

    const tokenExpTime:number = this.getTimeDifferenceInMinutes(new Date(this.store.getTokenExpiary()), new Date()); // Refresh one minute before token expires
    if(tokenExpTime<0){
      this.logout().subscribe({
        next: (()=>{
          window.location.href = window.location.origin;
        })
      });
    }
    const timeout:number = Math.floor(tokenExpTime*0.8)*10000; // Refresh after 80% of token lifetime expired
    if(timeout<2){      
      this.refreshToken().subscribe();
    } else {
      this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
    }
  }

  private refreshToken(): Observable<any> {
    if (this.isRefreshing) {
      return this.refreshTokenSubject.pipe(
        switchMap(token => {
          return of(token);
        })
      );
    } else {
      this.isRefreshing = true;
      const refreshToken = this.store.getRefreshToken();
      if (!refreshToken) {
        this.logout();
        return throwError(()=> new Error('No refresh token available'));
      }

      return this.httpClient.post<any>(`${environment.authentication_service}/refresh-token`, { "refreshToken": refreshToken })
        .pipe(
          tap((tokens:LoginResponseDTO) => {
            this.isRefreshing = false;
            this.storeTokens(tokens);
            this.refreshTokenSubject.next(tokens.token);
          }),
          catchError(error => {
            this.isRefreshing = false;
            this.logout();
            return throwError(()=> new Error('Silent Refresh Error!'));
          })
        );
    }
  }
  
  private storeTokens(tokenResp:LoginResponseDTO){
    this.store.setAccessToken(tokenResp.token);
    this.store.setRefreshToken(tokenResp.refreshToken);
    this.store.setTokenExpiary(tokenResp.expireTime);
    this.store.setTokenExpiaryMinutes(Math.floor((new Date(tokenResp.expireTime).getTime() - Date.now())/(1000*60)));
    this.scheduleRefreshToken();
  }

  private getTimeDifferenceInMinutes(expDate:Date, currentDate:Date): number{
    let differenceInMilliseconds: number = expDate.getTime() - currentDate.getTime();
    // Convert milliseconds to minutes (1 minute = 60,000 milliseconds)
    let differenceInMinutes: number = differenceInMilliseconds / (1000 * 60);

    return Math.floor(differenceInMinutes);
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