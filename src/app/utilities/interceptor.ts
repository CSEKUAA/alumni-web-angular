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
import { AuthService } from '../modules/shared/services/auth.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(
    private uiService: UIService,
    private authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.store.getToken() && request.url.toString().indexOf('token') < 0) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.store.getToken()}`,
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
          this.uiService.setCustomError(AlertType.FAILED, AlertMessage.FAILED);
        } else if (
          error.status === ErrorCode.BAD_REQUEST &&
          error.error.message === ErrorMessage.PENDING_AMENDMENT
        ) {
          this.uiService.setCustomError(
            AlertType.DUPLICATE,
            AlertMessage.PENDING_AMENDMENT
          );
        } else if (error.status === ErrorCode.UNAUTHORIZED) {
          this.authService.logout();
        } else if (
          error.error.code === ErrorCode.INTERNAL_SERVER_ERROR &&
          error.error.message === 'Lowest total rate is lower than your bid'
        ) {
          this.uiService.setCustomError(
            AlertType.FAILED,
            AlertMessage.LOWEST_QUOTATION_EXISTS
          );
        } else if (
          error.status === ErrorCode.BAD_REQUEST &&
          error.error.message === ErrorMessage.UNIQUE_REFERENCE_NO
        ) {
          this.uiService.setCustomError(
            AlertType.FAILED,
            AlertMessage.DUPLICATE_REFERENCE_NO
          );
        } else if (
          error.status === ErrorCode.INTERNAL_SERVER_ERROR &&
          error.error.message.indexOf(
            'An object with this name already exists'
          ) >= 0
        ) {
          this.uiService.setCustomError(
            AlertType.FAILED,
            AlertMessage.DUPLICATE_FILE
          );
        } else if (error.status === ErrorCode.BAD_REQUEST) {
          this.uiService.setCustomError(AlertType.FAILED, error.error.message);
        } else if (error.status === ErrorCode.CONFLICT) {
          this.uiService.setCustomError(
            AlertType.DUPLICATE,
            error.error.message
          );
        }

        throw error.statusText;
      })
    );
  }
}