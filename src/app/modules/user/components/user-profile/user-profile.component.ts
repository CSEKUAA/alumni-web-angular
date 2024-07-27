import { Component, OnInit } from '@angular/core';
import { UserProfileResponseDTO } from '../../../shared/models/api.response';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{
  userProfileInfo!:UserProfileResponseDTO;
  profileImage:string='https://cdn.pixabay.com/photo/2016/03/31/19/57/avatar-1295404_960_720.png';

  constructor(private userService:UserService){}

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: ((resp:UserProfileResponseDTO)=>{
        this.userProfileInfo = resp;
        if(resp.photo==='--'){
          this.userProfileInfo.photo=this.profileImage;
        }
      })
    })
  }
}
