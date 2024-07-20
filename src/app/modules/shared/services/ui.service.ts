import { Injectable } from "@angular/core";
import Swal from 'sweetalert2';

@Injectable({
    providedIn:'root'
})

export class UIService{

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
}