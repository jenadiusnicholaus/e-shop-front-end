import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { SharedService } from "../shared/custom_http.service";
import Swal from "sweetalert2";
// other imports

@Injectable({
  providedIn: "root",
})
export class RepositoryService {
  constructor(public httpShareService: SharedService) {}
  // other methods...

  getList(url: string, successcallback: Function, errorCallBack: Function) {
    this.httpShareService.get<any>(url, null).subscribe(
      (res) => {
        successcallback(res);
      },
      (error) => {
        errorCallBack(error);
      }
    );
  }

  getSingle(url: string, successcallback: Function, errorCallBack: Function) {
    this.httpShareService.get<any>(url, null).subscribe(
      (res) => {
        successcallback(res);
      },
      (error) => {
        errorCallBack(error);
      }
    );
  }

  addItem(
    url: string,
    data: any,
    successcallback: Function,
    errorCallBack: Function
  ) {
    this.httpShareService.post<any>(null, url, data).subscribe(
      (res) => {
        successcallback(res);
      },
      (error) => {
        errorCallBack(error);
      }
    );
  }

  updateItem(
    url: string,
    data: any,
    successcallback: Function,
    errorCallBack: Function
  ) {
    this.httpShareService.put<any>(url, data, null).subscribe(
      (res) => {
        successcallback(res);
      },
      (error) => {
        errorCallBack(error);
      }
    );
  }

  deleteItem(url: string, successcallback: Function, errorCallBack: Function) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#34c38f",
      cancelButtonColor: "#ff3d60",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        this.httpShareService.delete<any>(url).subscribe(
          (res) => {
            successcallback(res);
          },
          (error) => {
            errorCallBack(error);
          }
        );
      }
    });
  }
  // Add similar error handling for addItem and removeItem methods
}
