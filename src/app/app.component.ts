// app.component.ts
import { Component, OnInit } from "@angular/core";
import { ApiService } from "./api.service";
import {data} from "./product-requests";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  data: data = {productRequests: [],
  };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getAllProductRequests().subscribe((data) => {
      this.data = data;
    });
  }
}
