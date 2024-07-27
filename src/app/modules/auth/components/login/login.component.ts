import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdentityService } from '../../../shared/services/identity.service';
import { LoginDTO } from '../../models/auth.models';
import { UIService } from '../../../shared/services/ui.service';
import { StoreService } from '../../../shared/services/store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService:IdentityService, private store:StoreService, private uiService:UIService) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      identifier: ['', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]],
      password: ['', Validators.required],
      loginType: ['ROLL', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      let loginModel:LoginDTO = <LoginDTO> this.loginForm.value;

      this.authService.login(loginModel).subscribe({
        next: (() => {   
          window.location.href = window.location.origin;
        }),
        error: ((error: any) =>{
          this.uiService.showErrorAlert(error);
        })
      });
    }
  }
}
