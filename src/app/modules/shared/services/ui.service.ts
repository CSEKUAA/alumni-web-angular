import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import Swal from 'sweetalert2';
import { IdentityService } from "./identity.service";
import { Location } from "@angular/common";

@Injectable({
    providedIn:'root'
})

export class UIService{
  loggedIn:Subject<boolean> = new Subject<boolean>();
  constructor(private identityService:IdentityService, private location:Location){}

  showSuccessAlert(message:string) {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message,
      confirmButtonText: 'OKAY'
    });
  }

  showErrorAlert(message:string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      confirmButtonText: 'OKAY'
    });
  }

  showInfoAlert(message:string) {
    Swal.fire({
      icon: 'info',
      title: 'Info',
      text: message,
      confirmButtonText: 'OKAY'
    });
  }

  showConfirmationAlert() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    });
  }

  showConfirmationLogoutAlert(message:string) {
    Swal.fire({
      title: 'Success',
      text: message,
      icon: 'success',
      showCancelButton: false,
      confirmButtonText: 'OKAY'
    }).then((result) => {
      if (result.isConfirmed) {
        this.identityService.logout().subscribe({
          next: (()=>{        
            window.location.href = window.location.origin;
          })
        })
      }
    });
  }

  showSuccessAlertWithGoBackAction(message:string){
    Swal.fire({
      title: 'Success',
      text: message,
      icon: 'success',
      showCancelButton: false,
      confirmButtonText: 'OKAY'
    }).then((result) => {
      if (result.isConfirmed) {
        this.location.back();
      }
    });
  }
}