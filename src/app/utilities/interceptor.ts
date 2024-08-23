import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { UIService } from '../modules/shared/services/ui.service';
import { IdentityService } from '../modules/shared/services/identity.service';
import { StoreService } from '../modules/shared/services/store.service';
import { AlertMessage, ErrorCode, ErrorMessage } from './utilities';
import { LoaderService } from '../modules/shared/services/loader.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(
    private uiService: UIService,
    private identityService: IdentityService,
    private store:StoreService,
    private loaderService:LoaderService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if(request.url.toString().indexOf('auth/refresh-token') < 0){
      this.loaderService.show();
    }
    
    if(!this.identityService.hasValidAccessToken()){
      this.identityService.logout();
    }

    if(this.identityService.hasValidAccessToken() && 
      (request.url.toString().indexOf('api/profile-picture')>=0 || request.url.toString().indexOf('file-service/upload')>=0)){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.store.getAccessToken()}`,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'multipart/form-data'
        },
      });
    }    
    else if (this.identityService.hasValidAccessToken() && request.url.toString().indexOf('auth/login') < 0) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.store.getAccessToken()}`,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
      });
    }

    return next.handle(request).pipe(
      tap((event: HttpEvent<any>)=>{
        if (event instanceof HttpResponse) {
          this.loaderService.hide();
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.loaderService.hide();
        if (
          error.status === ErrorCode.INTERNAL_SERVER_ERROR &&
          error.error.error === ErrorMessage.SERVER_ERROR
        ) {
          this.uiService.showErrorAlert(AlertMessage.FAILED);
        } else if (
          error.status === ErrorCode.BAD_REQUEST
        ) {
          this.uiService.showErrorAlert(AlertMessage.BAD_REQUEST);
        } else if (error.status === ErrorCode.UNAUTHORIZED) {
          this.identityService.logout();
        } else if (
          error.error.code === ErrorCode.INTERNAL_SERVER_ERROR
        ) {
          this.uiService.showErrorAlert(AlertMessage.FAILED);
        }

        throw error.statusText;
      })
    );
  }
}