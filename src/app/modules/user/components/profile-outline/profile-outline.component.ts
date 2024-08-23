import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { UserProfileResponseDTO } from '../../../shared/models/api.response';
import { UserService } from '../../../shared/services/user.service';
import { UIService } from '../../../shared/services/ui.service';

@Component({
  selector: 'app-profile-outline',
  templateUrl: './profile-outline.component.html',
  styleUrl: './profile-outline.component.scss'
})
export class ProfileOutlineComponent implements OnInit, OnChanges{
  @Input('userProfile') userProfile!:UserProfileResponseDTO;
  @Output('onSuccessApplication') successApplicationEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  profileImage:string='Sample';
  isButtonVisible: boolean = false;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private userService:UserService, private uiService:UIService){}

  ngOnInit(): void {
    if(this.userProfile && this.userProfile.photo==='--'){
      this.userProfile.photo=this.profileImage;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userProfile']) {
      this.userProfile=this.userProfile;
      if(this.userProfile && this.userProfile.photo==='--'){
        this.userProfile.photo=this.profileImage;
      }
    }
  }

  showButton() {
    this.isButtonVisible = true;
  }

  hideButton() {
    this.isButtonVisible = false;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.changeProfilePicture(file);
    }
  }

  changeProfilePicture(imageFile:File){
    const formData = new FormData();
    formData.append('file', imageFile);

    this.userService.uploadProfilePicture(formData).subscribe({
      next: ()=>{
        this.successApplicationEvent.emit(true);
        this.clearFileInput();
        this.uiService.showSuccessAlert('Profile Picture Successfully Updated!');

      },
      error: ((error:Error)=>{
        this.clearFileInput();
        this.uiService.showErrorAlert('File Upload Failed!');
      })
    })
  }

  clearFileInput(){
    this.fileInput.nativeElement.value = '';
  }
}
