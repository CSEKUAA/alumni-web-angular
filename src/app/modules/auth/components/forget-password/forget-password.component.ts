import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdentityService } from '../../../shared/services/identity.service';
import { Router } from '@angular/router';
import { UIService } from '../../../shared/services/ui.service';
import { Title } from '@angular/platform-browser';
import { UserAccessService } from '../../../shared/services/user.access.service';
import { ForgetPasswordDTO } from '../../models/auth.models';
import { AlumniService } from '../../../shared/services/alumni.service';
import { AuthenticationService } from '../../../shared/services/authentication.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent implements OnInit{
  title:string = 'Forget Password | KUAA';
  forgetPasswordForm!: FormGroup;

  constructor(private fb: FormBuilder, private router:Router, private uiService:UIService, private titleService:Title, private authenticationService:AuthenticationService){}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.forgetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(){
    if (this.forgetPasswordForm.valid) {
      let forgetPasswordModel:ForgetPasswordDTO = <ForgetPasswordDTO> this.forgetPasswordForm.value;

      this.authenticationService.forgetPassword(forgetPasswordModel).subscribe({
        next: ((resp:any) => {
          let message:string = resp?resp.message:'';
          this.uiService.showSuccessAlertWithGoToLogin(message.toUpperCase());
        }),
        error: ((error: Error) =>{
          this.uiService.showErrorAlert('Unable to send password reset link! Please try correcting email address or try again later!');
        })
      });
    }
  }
}
