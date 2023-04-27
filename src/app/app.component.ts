// app.component.ts
import { Component, OnInit } from "@angular/core";
import { ApiService } from "./api.service";
import {Data} from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  data: Data = {
    currentUser: {
      image: "",
      name: "",
      username: "",
    },
    productRequests: [],
  };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getAllProductRequests().subscribe((data) => {
      this.data = data;
    });
  }
}
