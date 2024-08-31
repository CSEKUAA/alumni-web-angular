import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { StoreService } from '../services/store.service';

@Directive({
  selector: '[isLoggedIn]'
})
export class LoggedInDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private store: StoreService
  ) {
    this.updateView();
  }

  private updateView(): void {
    this.viewContainer.clear();
    if (this.store.isLoggedIn()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
