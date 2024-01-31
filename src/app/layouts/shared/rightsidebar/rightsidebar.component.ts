import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-rightsidebar",
  templateUrl: "./rightsidebar.component.html",
  styleUrls: ["./rightsidebar.component.scss"],
})
export class RightsidebarComponent implements OnInit {
  isLightModeOn: boolean = true; // Light Mode is enabled by default
  isDarkModeOn: boolean = false;

  constructor() {}

  ngOnInit(): void {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.body.setAttribute("data-bs-theme", savedTheme);
      this.isDarkModeOn = savedTheme === "dark";
      this.isLightModeOn = savedTheme === "light";
    }
  }
  /**
   * Hide the sidebar
   */
  public hide() {
    document.body.classList.remove("right-bar-enabled");
  }

  onLightModeChange(): void {
    // When the light mode switch changes, disable the dark mode switch
    this.isDarkModeOn = false;
    document.body.setAttribute("data-bs-theme", "light");
    localStorage.setItem("theme", "light"); // Save the theme to localStorage
  }

  onDarkModeChange(): void {
    // When the dark mode switch changes, disable the light mode switch
    this.isLightModeOn = false;
    document.body.setAttribute("data-bs-theme", "dark");
    localStorage.setItem("theme", "dark"); // Save the theme to localStorage
  }
}
