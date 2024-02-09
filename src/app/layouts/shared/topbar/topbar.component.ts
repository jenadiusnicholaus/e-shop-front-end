import { Component, OnInit, Inject, Output, EventEmitter } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";

import { AuthenticationService } from "../../../core/services/auth.service";
import { AuthfakeauthenticationService } from "../../../core/services/authfake.service";
import { LanguageService } from "../../../core/services/language.service";
import { environment } from "src/environments/environment";
import { SharedService } from "src/app/shared/custom_http.service";
import { CustomAlertService } from "src/app/shared/custom-alert.service";
import { UserProfileModel } from "./tool.models";
// import { environment } from '../../../../environments/environment';

@Component({
  selector: "app-topbar",
  templateUrl: "./topbar.component.html",
  styleUrls: ["./topbar.component.scss"],
})
export class TopbarComponent implements OnInit {
  element: any;
  configData: any;
  cookieValue;
  flagvalue;
  countryName;
  valueset: string;
  error = "";
  userProfileModel: UserProfileModel;

  formattedCurrentTime: string;

  listLang = [
    { text: "English", flag: "assets/images/flags/us.jpg", lang: "en" },
    {
      text: "Swahili",
      flag: "assets/images/flags/tz.png",
      lang: "sw",
    },
    { text: "German", flag: "assets/images/flags/germany.jpg", lang: "de" },
    { text: "Italian", flag: "assets/images/flags/italy.jpg", lang: "it" },
    { text: "Russian", flag: "assets/images/flags/russia.jpg", lang: "ru" },
  ];

  // tslint:disable-next-line: max-line-length
  constructor(
    @Inject(DOCUMENT) private document: any,
    private router: Router,
    private authService: AuthenticationService,
    private authFackservice: AuthfakeauthenticationService,
    public languageService: LanguageService,
    public cookiesService: CookieService,
    public httpShareService: SharedService,
    public customAlert: CustomAlertService
  ) {}

  @Output() mobileMenuButtonClicked = new EventEmitter();
  @Output() settingsButtonClicked = new EventEmitter();

  ngOnInit(): void {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);

    this.element = document.documentElement;
    this.configData = {
      suppressScrollX: true,
      wheelSpeed: 0.3,
    };

    this.cookieValue = this.cookiesService.get("lang");
    const val = this.listLang.filter((x) => x.lang === this.cookieValue);
    this.countryName = val.map((element) => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) {
        this.valueset = "assets/images/flags/tz.jpg";
      }
    } else {
      this.flagvalue = val.map((element) => element.flag);
    }

    this.ngUserProfile();
  }

  updateTime(): void {
    const options = {
      hour: "2-digit" as const,
      minute: "2-digit" as const,
      second: "2-digit" as const,
    };

    const currentTime = new Date();
    this.formattedCurrentTime = currentTime.toLocaleTimeString(
      "en-US",
      options
    );
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
   * Toggles the right sidebar
   */
  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }

  ngUserProfile() {
    let login_url =
      environment.E_SHOP_BASE_URL +
      environment.AUTHENTICATION.AUTHENTICATION_BASE_URL +
      environment.AUTHENTICATION.USER_PROFILE;
    this.httpShareService.get<UserProfileModel>(login_url, null).subscribe(
      (data) => {
        this.userProfileModel = data;
        // this.customAlert.successmsg(
        //   "Welcome to E-shop!",
        //   `Hi ${data.user.username} You are wellcome!`,
        //   "success"
        // );
      },
      (error) => {
        this.error = error ? error : "";
      }
    );
  }

  /**
   * Fullscreen method
   */
  fullscreen() {
    document.body.classList.toggle("fullscreen-enable");
    if (
      !document.fullscreenElement &&
      !this.element.mozFullScreenElement &&
      !this.element.webkitFullscreenElement
    ) {
      if (this.element.requestFullscreen) {
        this.element.requestFullscreen();
      } else if (this.element.mozRequestFullScreen) {
        /* Firefox */
        this.element.mozRequestFullScreen();
      } else if (this.element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.element.webkitRequestFullscreen();
      } else if (this.element.msRequestFullscreen) {
        /* IE/Edge */
        this.element.msRequestFullscreen();
      }
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }

  /**
   * Translate language
   */
  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.cookieValue = lang;
    this.languageService.setLanguage(lang);
  }

  /**
   * Logout the user
   */
  logout() {
    this.authService.logout();
  }
}
