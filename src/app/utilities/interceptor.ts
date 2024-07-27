import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { UIService } from '../modules/shared/services/ui.service';
import { IdentityService } from '../modules/shared/services/identity.service';
import { StoreService } from '../modules/shared/services/store.service';
import { AlertMessage, ErrorCode, ErrorMessage } from './utilities';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(
    private uiService: UIService,
    private authService: IdentityService,
    private store:StoreService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if(!this.authService.hasValidAccessToken()){
      this.authService.logout();
    }
    
    if (this.authService.hasValidAccessToken() && request.url.toString().indexOf('auth/login') < 0) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.store.getAccessToken()}`,
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    return next.handle(request).pipe(
      tap(),
      catchError((error: HttpErrorResponse) => {
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
          this.authService.logout();
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