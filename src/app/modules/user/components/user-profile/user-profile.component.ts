import { Component, OnInit } from '@angular/core';
import { UserProfileResponseDTO } from '../../../shared/models/api.response';
import { UserService } from '../../../shared/services/user.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{
  title:string = 'Profile | KUAA';
  userProfileInfo!:UserProfileResponseDTO;
  isUpdateCalled!:boolean;

  constructor(private userService:UserService, private titleService:Title){}

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
  }

  toggleUpdateMode(){
    this.isUpdateCalled=!this.isUpdateCalled;
    if(!this.isUpdateCalled){
      this.loadProfileInformation();
    }
  }
}
