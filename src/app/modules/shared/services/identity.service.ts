import { Injectable } from "@angular/core";
import { LoginDTO } from "../../auth/models/auth.models";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, catchError, Observable, of, switchMap, tap, throwError } from "rxjs";
import { environment } from "../../../../environments/environment";
import { StoreService } from "./store.service";
import { LoginResponseDTO } from "../models/api.response";
import { Router } from "@angular/router";
import moment from "moment";

@Injectable({
  providedIn:'root'
})

export class IdentityService{
  private refreshTokenTimeout!:any;
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private auththenticationService:string=`${environment.server_root}/auth`;
    
  constructor(private httpClient:HttpClient, private store:StoreService, private router:Router){}

  login(model:LoginDTO): Observable<any>{
      return this.httpClient.post<any>(`${this.auththenticationService}/login`, model)
        .pipe(
          tap((resp:LoginResponseDTO)=>{
            this.storeTokens(resp);
          })
        );
  }

  logout(): Observable<any> {
    return this.httpClient.post<any>(`${this.auththenticationService}/logout`,{})
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
        return true;
      }
    }

    return false;
  }

  scheduleRefreshToken(): void {
    const accessToken = this.store.getAccessToken();
    if (!accessToken) return;

    const endTime = moment(this.store.getTokenExpiary());
    const startTime = moment();

    // console.log(this.store.getTokenExpiary());
    // console.log(endTime.format('YYYY-MM-DD HH:mm:ss'));
    // console.log(startTime.format('YYYY-MM-DD HH:mm:ss'));

    const tokenExpTime:number = Math.ceil(endTime.diff(startTime)/(1000*60)); // Refresh one minute before token expires
    if(tokenExpTime<0){
      this.logout().subscribe({
        next: (()=>{
          window.location.href = window.location.origin;
        })
      });
    }

    const timeout:number = Math.ceil(tokenExpTime*0.9)*10000; // Refresh after 90% of token lifetime expired
    if(tokenExpTime<2){      
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

      return this.httpClient.post<any>(`${this.auththenticationService}/refresh-token`, { "refreshToken": refreshToken })
        .pipe(
          tap((tokens:LoginResponseDTO) => {
            this.isRefreshing = false;
            this.storeTokens(tokens);
            this.refreshTokenSubject.next(tokens.token);
          }),
          catchError(error => {
            this.isRefreshing = false;
            this.router.navigate(['auth/login']);
            return throwError(()=> new Error('Silent Refresh Error!'));
          })
        );
    }
  }
  
  private storeTokens(tokenResp:LoginResponseDTO){
    this.store.setAccessToken(tokenResp.token);
    this.store.setRefreshToken(tokenResp.refreshToken);

    const originalDateTime = moment(tokenResp.expireTime);
    // Get the machine's timezone offset in minutes
    const machineTimezoneOffset = moment().utcOffset();
    // Apply the machine's timezone offset to the ISO datetime
    const adjustedDateTime = originalDateTime.utcOffset(machineTimezoneOffset).format('YYYY-MM-DDTHH:mm:ss[Z]');
    // const adjustedDateTime = originalDateTime.format('YYYY-MM-DD HH:mm:ss');
    // console.log(adjustedDateTime);
    const timeDifference = originalDateTime.diff(moment());

    this.store.setTokenExpiary(adjustedDateTime);
    this.store.setTokenExpiaryMinutes(Math.ceil(timeDifference/(1000*60)));
    
    // this.scheduleRefreshToken();
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