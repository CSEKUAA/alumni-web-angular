import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdentityService } from '../../../shared/services/identity.service';
import { LoginDTO } from '../../models/auth.models';
import { UIService } from '../../../shared/services/ui.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserAccessService } from '../../../shared/services/user.access.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  title:string = 'Login | KUAA';
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private identityService:IdentityService, private router:Router, 
    private uiService:UIService, private titleService:Title, private userAccessService:UserAccessService) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.loginForm = this.fb.group({
      identifier: ['', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]],
      password: ['', Validators.required],
      loginType: ['ROLL', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      let loginModel:LoginDTO = <LoginDTO> this.loginForm.value;

      this.identityService.login(loginModel).subscribe({
        next: (() => {
          this.uiService.loggedIn.next(true); 
          this.userAccessService.getCurrentUserRole().subscribe({
            next: (()=>{              
              this.router.navigate(['user/profile']);
            }),
            error:((error:Error)=>{
              console.log(error);
              this.uiService.showErrorAlert('Something went wrong while login, please try again!');
            })
          })
        }),
        error: ((error: Error) =>{
          console.log(error);
          this.uiService.showErrorAlert(error.message);
        })
      });
    }
  }
}
