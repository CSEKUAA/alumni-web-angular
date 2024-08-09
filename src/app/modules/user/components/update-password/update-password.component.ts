import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { UserProfileResponseDTO } from '../../../shared/models/api.response';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { UpdatePasswordRequestDTO } from '../../../shared/models/api.request';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { UIService } from '../../../shared/services/ui.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.scss'
})
export class UpdatePasswordComponent implements OnInit{
  userProfileInfo!:UserProfileResponseDTO;
  updatePasswordForm!: FormGroup;

  constructor(private userService:UserService, private formBuilder:FormBuilder, private authService:AuthenticationService, private uiService:UIService){}

  ngOnInit(): void {
    this.loadProfileInformation();
    this.updatePasswordForm = this.formBuilder.group({
      oldPassword: new FormControl('', {validators: Validators.required}),
      newPassword: new FormControl('', {validators: Validators.required}),
      confirmPassword: new FormControl('', {validators: Validators.required}),
    }, {
      validator: [
        this.mustMatch('newPassword', 'confirmPassword'),
        this.cannotMatch('oldPassword', 'newPassword')
      ]
    })
  }

  // Validator to check if two fields match (e.g., newPassword and confirmPassword)
  mustMatch(controlName: string, matchingControlName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const controlToMatch = control.get(controlName);
      const matchingControl = control.get(matchingControlName);

      if (!controlToMatch || !matchingControl) {
        return null;
      }

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return null;
      }

      if (controlToMatch.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }

      return null;
    };
  }

  // Validator to check if two fields do not match (e.g., oldPassword and newPassword)
  cannotMatch(controlName: string, matchingControlName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const controlToCheck = control.get(controlName);
      const controlToCompare = control.get(matchingControlName);

      if (!controlToCheck || !controlToCompare) {
        return null;
      }

      if (controlToCompare.errors && !controlToCompare.errors['cannotMatch']) {
        return null;
      }

      if (controlToCheck.value === controlToCompare.value) {
        controlToCompare.setErrors({ cannotMatch: true });
      } else {
        controlToCompare.setErrors(null);
      }

      return null;
    };
  }

  loadProfileInformation(){
    this.userService.getUserProfile().subscribe({
      next: ((resp:UserProfileResponseDTO)=>{
        this.userProfileInfo = resp;
      })
    });
  }

  onSubmit(){
    if(this.updatePasswordForm.valid){
      let updatePasswordRequest:UpdatePasswordRequestDTO = <UpdatePasswordRequestDTO> this.updatePasswordForm.value;
      this.authService.updatePassword(updatePasswordRequest).subscribe({
        next: ((resp:any)=>{
          console.log(resp);
          this.uiService.showConfirmationLogoutAlert(`${resp.message}. Please login with the new password!`)
        }),
        error: (()=>{
          this.uiService.showErrorAlert('Failed to update Password!');
        })
      })

    }
  }
}
