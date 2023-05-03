import { Component, OnInit } from '@angular/core';
import { productRequests } from '../product-requests';
import { ProductRequestService } from '../product-request.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-request',
  templateUrl: './product-request.component.html',
  styleUrls: ['./product-request.component.scss'],
})
export class ProductRequestComponent implements OnInit {
  productRequests$: Observable<productRequests[]> = new  Observable<productRequests[]>();

  constructor(private requestService: ProductRequestService) {

  }

  ngOnInit(): void {
    this.productRequests$ = this.requestService.getAllProductRequests();
  }

  onCategoryChange(category: string): void {
    this.requestService.changeCategory(category);
  }
}
