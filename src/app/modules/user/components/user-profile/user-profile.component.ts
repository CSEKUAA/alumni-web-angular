import { Component, OnInit } from '@angular/core';
import { UserProfileResponseDTO } from '../../../shared/models/api.response';
import { UserService } from '../../../shared/services/user.service';
import { Title } from '@angular/platform-browser';
import { ContentService } from '../../../shared/services/content.service';
import { UIService } from '../../../shared/services/ui.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{
  title:string = 'Profile | KUAA';
  userProfileInfo!:UserProfileResponseDTO;
  isUpdateCalled!:boolean;
  cvUrl!:string;

  constructor(private userService:UserService, private titleService:Title, private contentService:ContentService, private uiService:UIService){}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.loadProfileInformation();
  }

  loadProfileInformation(){
    this.userService.getUserProfile().subscribe({
      next: ((resp:UserProfileResponseDTO)=>{
        this.userProfileInfo = resp;
      })
    });

    this.contentService.getUserCV().subscribe({
      next: ((resp:any)=>{
        if(resp){
          this.cvUrl = resp[0];
        }
      })
    })
  }

  toggleUpdateMode(){
    this.isUpdateCalled=!this.isUpdateCalled;
    if(!this.isUpdateCalled){
      this.loadProfileInformation();
    }
  }

  downloadFile() {
    if(this.cvUrl){
      this.contentService.downloadFile(this.cvUrl).subscribe({
        next: ((blob: Blob) => {
          const downloadLink = document.createElement('a');
          const objectUrl = URL.createObjectURL(blob);
          downloadLink.href = objectUrl;
          downloadLink.click();
          URL.revokeObjectURL(objectUrl); // Clean up memory
        }),
        error: ((err:Error)=>{
          this.uiService.showErrorAlert('Failed to download CV! Please try again later!');
        })
      })
    }
  }
}
