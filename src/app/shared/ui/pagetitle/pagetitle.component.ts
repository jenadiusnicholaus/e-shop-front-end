import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-pagetitle",
  templateUrl: "./pagetitle.component.html",
  styleUrls: ["./pagetitle.component.scss"],
})
export class PagetitleComponent implements OnInit {
  @Input() breadcrumbItems;
  @Input() title: string;
  @Input() showGoBackButton: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  goBack() {
    window.history.back();
  }
}
