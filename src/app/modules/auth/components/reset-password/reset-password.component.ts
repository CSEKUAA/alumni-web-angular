import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UIService } from '../../../shared/services/ui.service';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { ResetPasswordRequestDTO } from '../../models/auth.models';
import { ErrorCallback } from 'typescript';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit{
  title:string = 'Reset Password | KUAA';
  resetPasswordForm!: FormGroup;
  token:string='';

  constructor(private fb: FormBuilder, private router:Router, private route:ActivatedRoute, private uiService:UIService, private titleService:Title, private authenticationService:AuthenticationService){}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.resetPasswordForm = this.fb.group({
      token: new FormControl(this.token, {validators: Validators.required}),
      password: new FormControl('', {validators: [Validators.required, Validators.minLength(5)]}),
      confirmPassword:new FormControl('', {validators: [Validators.required, Validators.minLength(5)]}),
    }, {
      validator: [
        this.mustMatch('password', 'confirmPassword')
      ]
    });

    this.route.params.subscribe({
      next:((param:Params)=>{
        if(param['token']){
          this.token = param['token'];
          this.resetPasswordForm.get('token')?.setValue(this.token);
        }
      })
    })
  }

  onSubmit(){
    if(this.resetPasswordForm.valid){
      let updatePasswordRequest:ResetPasswordRequestDTO = <ResetPasswordRequestDTO> this.resetPasswordForm.value;
      let tokenPassword = {"token": updatePasswordRequest.token, "password":updatePasswordRequest.password}
      this.authenticationService.resetPassword(tokenPassword).subscribe({
        next: ((resp:any)=>{
          this.uiService.showSuccessAlertWithGoToLogin(`Password Reset Successfull! Now login with new password!`);
        }),
        error: ((error:ErrorCallback)=>{
          this.uiService.showErrorAlert('Failed to Reset Password!');
        })
      })

    }
  }

  // Validator to check if two fields match (e.g., newPassword and confirmPassword)
  private mustMatch(controlName: string, matchingControlName: string): ValidatorFn {
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

}
