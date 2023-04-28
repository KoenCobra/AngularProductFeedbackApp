// app.component.ts
import {Component, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {ApiService} from "./api.service";
import {data} from "./product-requests";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  originalData: data = {productRequests: []};
  data: data = {productRequests: []};

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.api.getAllProductRequests().subscribe((data) => {
      this.originalData = data;
      this.filterRequestsByCategory('all');
    });
  }

  onCategoryChange(category: string): void {
    this.filterRequestsByCategory(category);
  }

// app.component.ts
  filterRequestsByCategory(category: string): void {
    this.data.productRequests = category === 'all'
      ? [...this.originalData.productRequests]
      : this.originalData.productRequests.filter(request =>
        request.category === category);
  }
}
