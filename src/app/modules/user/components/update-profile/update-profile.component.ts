import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserProfileResponseDTO } from '../../../shared/models/api.response';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss'
})
export class UpdateProfileComponent implements OnInit{
  @Input('userProfile') userProfile!:UserProfileResponseDTO;
  @Output('toggleUpdate') toggleUpdate: EventEmitter<boolean> = new EventEmitter<boolean>();
  userProfileForm!:FormGroup;

  constructor(){}

  ngOnInit(): void {
    this.userProfileForm = new FormGroup({
      bloodGroup: new FormControl<string>(this.userProfile.bloodGroup, { nonNullable:true, validators: [Validators.required]}),
      company: new FormControl<string>(this.userProfile.contactDetail.company, { nonNullable:true, validators: [Validators.required]}),
      companyAddress: new FormControl<string>(this.userProfile.contactDetail.companyAddress, { nonNullable:true, validators: [Validators.required]}),
      designation: new FormControl<string>(this.userProfile.contactDetail.designation, { nonNullable:true, validators: [Validators.required]}),
      dob: new FormControl<Date>(this.userProfile.dob, {}),
      nickName: new FormControl<string>(this.userProfile.nickName, { nonNullable:true, validators: [Validators.required]}),
      permanentAddress: new FormControl<string>(this.userProfile.contactDetail.permanentAddress,{ nonNullable:true, validators: [Validators.required]}),
      permanentCity: new FormControl<string>(this.userProfile.contactDetail.permanentCity, { nonNullable:true, validators: [Validators.required]}),
      permanentCountry: new FormControl<string>(this.userProfile.contactDetail.permanentCountry, { nonNullable:true, validators: [Validators.required]}),
      photo: new FormControl<string>('', {}),
      presentAddress:new FormControl<string>(this.userProfile.contactDetail.presentAddress, { nonNullable:true, validators: [Validators.required]}),
      presentCity: new FormControl<string>(this.userProfile.contactDetail.presentCity, { nonNullable:true, validators: [Validators.required]}),
      presentCountry: new FormControl<string>(this.userProfile.contactDetail.presentCountry, { nonNullable:true, validators: [Validators.required]}),
      profession: new FormControl<string>(this.userProfile.contactDetail.profession, { nonNullable:true, validators: [Validators.required]}),
      roll: new FormControl<string>(this.userProfile.roll, { nonNullable:true, validators: [Validators.required]})
    });
  }

  onSubmit(){
    console.log(this.userProfileForm);
  }

  onBackProfile(){
    this.toggleUpdate.emit(true);
  }

}
