import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { SharedService } from "../shared/custom_http.service";
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

  // Add similar error handling for addItem and removeItem methods
}
