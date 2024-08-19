import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private requestCount = 0;
  private loaderSubject = new BehaviorSubject<boolean>(false);
  loaderState = this.loaderSubject.asObservable();

  constructor() {}

  show() {
    this.requestCount++;
    this.updateLoaderState();
  }

  hide() {
    this.requestCount = Math.max(this.requestCount - 1, 0);
    this.updateLoaderState();
  }

  private updateLoaderState() {
    this.loaderSubject.next(this.requestCount > 0);
  }
}