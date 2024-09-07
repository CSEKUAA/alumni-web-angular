import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DropdownModel } from '../../models/dropdown.model';
import { RegistrationDTO } from '../../models/auth.models';
import { IdentityService } from '../../../shared/services/identity.service';
import { UIService } from '../../../shared/services/ui.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  title:string = 'Register | KUAA';
  registrationForm!: FormGroup;
  bloodGroups: string[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  constructor(private fb: FormBuilder, private identityService:IdentityService, private uiService:UIService, 
    private titleService:Title, private router:Router, private userService:UserService) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.registrationForm = this.fb.group({
      firstName: new FormControl('', { validators: [Validators.required] }),
      lastName: new FormControl('', { validators: [Validators.required] }),
      roll: new FormControl('', { validators: [Validators.required] }),
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { validators: [Validators.required] }),
      phoneNumber: new FormControl('', { validators: [Validators.required] }),
      confirmPassword: new FormControl('', { validators: [Validators.required] }),
      isAgree: new FormControl(false, { validators: [Validators.requiredTrue] })
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });
  }

  // Custom validator to check if passwords match
  mustMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[password];
      const matchingControl = formGroup.controls[confirmPassword];
      if (matchingControl.errors && !matchingControl.errors?.['mustMatch']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      let formValue = this.registrationForm.value;
      let registrationModel:RegistrationDTO = {
        email:formValue.email,
        firstName:formValue.firstName,
        lastName:formValue.lastName,
        password:formValue.password,
        phoneNumber:formValue.phoneNumber,
        roll:formValue.roll,
        fullName: `${formValue.firstName} ${formValue.lastName}`
      }
      
      this.userService.registerAlumni(registrationModel).subscribe({
        next: (()=>{
          this.uiService.showSuccessAlert('Registration Successful!');
          this.router.navigate(['auth/login']);
        }),
        error: ((error:Error)=>{
          this.uiService.showErrorAlert(error.message);
        })
      });
    }
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();

    return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
  }
}
