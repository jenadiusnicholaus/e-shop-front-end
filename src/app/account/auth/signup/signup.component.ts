import { Component, OnInit, AfterViewInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { AuthenticationService } from "../../../core/services/auth.service";
import { environment } from "../../../../environments/environment";
import { first } from "rxjs/operators";
import { UserProfileService } from "../../../core/services/user.service";
import { en } from "@fullcalendar/core/internal-common";
import { SharedService } from "src/app/shared/custom_http.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit, AfterViewInit {
  signupForm: UntypedFormGroup;
  submitted = false;
  error = "";
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
    private sharedService: SharedService
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
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return false;
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
        password2: this.signupForm.value.password,
        last_name: this.signupForm.value.last_name,
      };
      this.sharedService.post(null, regester_url, body).subscribe(
        (data) => {
          this.router.navigate(["/account/login"]);
        },
        (error) => {
          this.error = error ? error : "";
        }
      );
    }
  }
}
