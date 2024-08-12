import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { StoreService } from '../services/store.service';
import { UserRole } from '../../../utilities/utilities';

@Directive({
  selector: '[isAdmin]'
})
export class AdminDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private store: StoreService
  ) {
    this.updateView();
  }

  private updateView(): void {
    this.viewContainer.clear();
    if (this.store.getLoggedUserRole() === UserRole.ADMIN) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
