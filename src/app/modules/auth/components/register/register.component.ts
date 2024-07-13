import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropdownModel } from '../../models/dropdown.model';
import { RegistrationDTO } from '../../models/auth.models';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  bloodGroups: string[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  disciplines: DropdownModel[] = [
    {id:1, value: "ARCH"},
    {id:2, value: "CSE"},
    {id:3, value: "ECE"},
    {id:4, value: "BBA"}
  ];

  constructor(private fb: FormBuilder, private authService:AuthService) { }

  ngOnInit(): void {

    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      roll: ['', Validators.required],
      nickName: [''],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      bloodGroup: ['', Validators.required],
      dob: [''],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      isAgree: [false, Validators.requiredTrue],
      disciplineId: ['', Validators.required]
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
      let formattedValue:RegistrationDTO = {
        ...formValue,
        dob: formValue.dob ? this.formatDate(formValue.dob) : ''
      }

      this.authService.registerAlumni(formattedValue).subscribe(
        response => {
          alert('Registration Success!');
        },
        error => {
          alert(error);
        }
      );
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
