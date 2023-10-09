import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: "root",
})
export class SharedService {
  constructor(private http: HttpClient) {}

  getHeaders(h: any) {
    let headers = new HttpHeaders(h);
    return headers;
  }

  post<T>(headers?: any, url?: string, body?: any): Observable<T> {
    let response = this.http.post<T>(url, body, { headers: headers });
    return response;
  }

  get<T>(url?: string, headers?: any): Observable<T> {
    const requestOptions = { headers: headers };
    return this.http.get<T>(url, requestOptions);
  }

  postWithImage<T>(formData?: FormData, url?: string, ): Observable<T> {
    let response = this.http.post<T>(url, formData, );
    return response;
  }

  putWithImage<T>(formData?: FormData, url?: string, headers?:any): Observable<T> {
    let response = this.http.put<T>(url, formData);
    return response;
  }

  put<T>(url: string, body, options): any {
    return this.http.put<T>(url, body, {headers: options});
  }
}