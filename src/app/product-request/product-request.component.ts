import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../api.service";
import {productRequests} from "../product-requests";

@Component({
  selector: 'app-product-request',
  templateUrl: './product-request.component.html',
  styleUrls: ['./product-request.component.scss']
})
export class ProductRequestComponent implements OnInit{
  originalData!: productRequests[] ;
  data!: productRequests[];

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.api.getAllProductRequests().subscribe((data) => {
      console.log(data)
      this.originalData = data;
      const localStorageData = JSON.parse(localStorage.getItem('productRequests') || '[]');
      this.originalData = [...this.originalData, ...localStorageData];
      this.filterRequestsByCategory('all');
    });
  }


  onCategoryChange(category: string): void {
    this.filterRequestsByCategory(category);
  }

// app.component.ts
  filterRequestsByCategory(category: string): void {
    this.data = category === 'all'
      ? [...this.originalData]
      : this.originalData.filter(request =>
        request.category === category);
  }
}
