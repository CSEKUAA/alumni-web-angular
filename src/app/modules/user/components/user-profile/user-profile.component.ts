import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserProfileResponseDTO } from '../../../shared/models/api.response';
import { UserService } from '../../../shared/services/user.service';
import { Title } from '@angular/platform-browser';
import { UIService } from '../../../shared/services/ui.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{
  title:string = 'Profile | KUAA';
  userProfileInfo!:UserProfileResponseDTO;
  profileImage:string='Sample';
  isButtonVisible: boolean = false;
  @ViewChild('fileInput') fileInput!: ElementRef;
  isUpdateCalled!:boolean;

  constructor(private userService:UserService, private titleService:Title, private uiService:UIService){}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.loadProfileInformation();
  }

  loadProfileInformation(){
    this.userService.getUserProfile().subscribe({
      next: ((resp:UserProfileResponseDTO)=>{
        this.userProfileInfo = resp;
        if(resp.photo==='--'){
          this.userProfileInfo.photo=this.profileImage;
        }
      })
    });
  }

  toggleUpdateMode(){
    this.isUpdateCalled=!this.isUpdateCalled;
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
    formData.append('image', imageFile);

    this.userService.uploadProfilePicture(formData).subscribe({
      next: ()=>{
        this.loadProfileInformation();
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
