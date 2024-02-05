import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-shared-loader",
  templateUrl: "./shared-loader.component.html",
  styleUrls: ["./shared-loader.component.scss"],
})
export class SharedLoaderComponent implements OnInit {
  @Input() isLoading = false;
  constructor() {}

  ngOnInit(): void {}
}
