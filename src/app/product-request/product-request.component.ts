import {Component, Input, OnInit} from '@angular/core';
import {data} from "../product-requests";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-product-request',
  templateUrl: './product-request.component.html',
  styleUrls: ['./product-request.component.scss']
})
export class ProductRequestComponent implements OnInit{
  originalData: data = {productRequests: []};
  data: data = {productRequests: []};

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.api.getAllProductRequests().subscribe((data) => {
      this.originalData = data;
      const localStorageData = JSON.parse(localStorage.getItem('productRequests') || '[]');
      this.originalData.productRequests = [...this.originalData.productRequests, ...localStorageData];
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
