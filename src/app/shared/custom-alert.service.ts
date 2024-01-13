import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CustomAlertService {

  constructor() {


   }


   successmsg(title:String, text: String,icon
     ) {
    Swal.fire({
      title: `${title}`,
      text: `${text}!`,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: '#5438dc',
      cancelButtonColor: '#ff3d60'
    });
  }
}
