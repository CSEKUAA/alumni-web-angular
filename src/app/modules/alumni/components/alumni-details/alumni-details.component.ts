import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { UserProfileResponseDTO } from '../../../shared/models/api.response';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { UIService } from '../../../shared/services/ui.service';

@Component({
  selector: 'app-alumni-details',
  templateUrl: './alumni-details.component.html',
  styleUrl: './alumni-details.component.scss'
})
export class AlumniDetailsComponent implements OnInit, OnDestroy{
  subscription!:Subscription;
  studentId!:string;
  userProfileInfo!:UserProfileResponseDTO;
  cvUrl:string='Added Soon!';

  constructor(private userService:UserService, private route:ActivatedRoute, private location:Location, private uiService:UIService){}

  ngOnInit(): void {
    this.studentId = this.route.snapshot.paramMap.get('roll')!;
    this.fetchAlumniInformations();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  fetchAlumniInformations(){
    this.subscription = this.userService.getUserByStudentId(this.studentId).subscribe({
      next: ((data:UserProfileResponseDTO)=>{
        this.userProfileInfo=data;
      })
    });
  }

  onBackToAlumniList(){
    this.location.back();
  }

  downloadFile(){
    this.uiService.showInfoAlert('Will be added shortly!');
  }

}
