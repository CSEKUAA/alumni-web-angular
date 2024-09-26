import { Component, EventEmitter, Output } from '@angular/core';
import { ContentService } from '../../../shared/services/content.service';
import { UIService } from '../../../shared/services/ui.service';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.scss'
})
export class CvComponent {
  selectedFile: File | null = null;
  @Output('onSuccessApplication') successApplicationEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private contentService:ContentService, private uiService:UIService){}

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLElement;
    fileInput.click();
  }

  // Handle file selection
  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      const formData = new FormData();
      formData.append('file', file);

      this.contentService.uploadCV(formData).subscribe({
        next: ((resp: any)=> {
          this.successApplicationEvent.emit(true);
          this.uiService.showSuccessAlert('CV Uploaded to Your Profile!');
        })
      })
    }
  }
}
