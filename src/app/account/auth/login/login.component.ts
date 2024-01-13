import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";

import { AuthenticationService } from "../../../core/services/auth.service";
import { AuthfakeauthenticationService } from "../../../core/services/authfake.service";

import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";

import { environment } from "../../../../environments/environment";
import { SharedService } from "src/app/shared/custom_http.service";
import { CustomAlertService } from "src/app/shared/custom-alert.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  submitted = false;
  error = "";
  returnUrl: string;

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(
    public httpShareService: SharedService,
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public authenticationService: AuthenticationService,
    public authFackservice: AuthfakeauthenticationService,
    public customAlert: CustomAlertService
  ) {}

  ngOnInit() {
    document.body.removeAttribute("data-layout");
    document.body.classList.add("auth-body-bg");

    this.loginForm = this.formBuilder.group({
      username: ["nicho", [Validators.required]],
      password: ["1234", [Validators.required]],
    });

    // reset login status
    // this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return false;
    } else {
      // LOGIN THE USER AND REDIRECT TO HOMW  PAGE.
      let login_url =
        environment.E_SHOP_BASE_URL +
        environment.AUTHENTICATION.AUTHENTICATION_BASE_URL +
        environment.AUTHENTICATION.LOGIN_URL;
      this.httpShareService
        .post(null, login_url, this.loginForm.value)
        .subscribe(
          (data) => {
            sessionStorage.setItem("access", data["access"]);

            this.router.navigate(["/"]);
            // this.customAlert.successmsg('Welcome to E-shop!', `You are wellcome, ${data.user.username}`)
          },
          (error) => {
            console.log(error);
            this.error = error ? error : "";
          }
        );
    }
  }
}
