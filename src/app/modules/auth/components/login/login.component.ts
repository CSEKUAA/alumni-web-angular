import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginDTO } from '../../models/auth.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService:AuthService) { }

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

      this.authService.login(loginModel).subscribe(
        response => {
          alert('Login Success!');
        },
        error => {
          alert(error);
        }
      );
    }
  }
}
