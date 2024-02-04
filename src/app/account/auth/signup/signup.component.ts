import { Component, OnInit, AfterViewInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { AuthenticationService } from "../../../core/services/auth.service";
import { environment } from "../../../../environments/environment";
import { UserProfileService } from "../../../core/services/user.service";
import { SharedService } from "src/app/shared/custom_http.service";
import { CustomAlertService } from "src/app/shared/custom-alert.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit, AfterViewInit {
  signupForm: UntypedFormGroup;
  submitted = false;
  issubmitting = false;
  errors = {
    username: [],
    email: [],
    password: [],
    first_name: [],
    password2: [],
    last_name: [],
  };
  successmsg = false;

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserProfileService,
    private sharedService: SharedService,
    private customAlert: CustomAlertService
  ) {}

  ngOnInit() {
    document.body.removeAttribute("data-layout");
    document.body.classList.add("auth-body-bg");

    this.signupForm = this.formBuilder.group({
      username: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      first_name: ["", Validators.required],
      password2: ["", Validators.required],
      last_name: ["", Validators.required],
    });
  }

  ngAfterViewInit() {}

  // convenience getter for easy access to form fields
  get f() {
    return this.signupForm.controls;
  }

  /**
   * On submit form
   */

  clearErrors() {
    this.errors = {
      username: [],
      email: [],
      password: [],
      first_name: [],
      password2: [],
      last_name: [],
    };
  }
  onSubmit() {
    this.submitted = true;
    this.issubmitting = true;
    this.clearErrors();

    // stop here if form is invalid
    if (this.signupForm.invalid) {
      // return false;
      this.customAlert.warningToast(
        "Invalid Form",
        "Please fill the form correctly",
        "warning"
      );
      this.issubmitting = false;
      return;
    } else {
      let regester_url =
        environment.E_SHOP_BASE_URL +
        environment.AUTHENTICATION.AUTHENTICATION_BASE_URL +
        environment.AUTHENTICATION.REGISTER_URL;
      const body = {
        username: this.signupForm.value.username,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        first_name: this.signupForm.value.first_name,
        password2: this.signupForm.value.password2,
        last_name: this.signupForm.value.last_name,
      };
      this.sharedService.post(null, regester_url, body).subscribe(
        (data) => {
          this.issubmitting = false;

          this.customAlert.successToast(
            "Account Created Successfully",
            "Account Created Successfully",
            "success"
          );
          this.router.navigate(["/account/login"]);
        },
        (error: HttpErrorResponse) => {
          this.issubmitting = false;

          this.handleErrorResponse(error);
          this.customAlert.errorToast(
            "Error in creating account",
            "Error in creating account",
            "error"
          );
        }
      );
    }
  }
  handleErrorResponse(errorResponse) {
    for (let field in errorResponse) {
      console.log(field);
      if (this.errors.hasOwnProperty(field)) {
        this.errors[field] = errorResponse[field];
      }
    }
  }
}
