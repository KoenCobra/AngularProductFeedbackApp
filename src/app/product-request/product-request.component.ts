import { Component, OnInit } from '@angular/core';
import { productRequests } from '../product-requests';
import { ProductRequestService } from '../product-request.service';
import { Observable } from 'rxjs';
import {map} from "rxjs/operators";

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

  onSortCriterionChange(criterion: string): void {
    this.productRequests$ = this.productRequests$.pipe(
      map((requests) => {
        switch (criterion) {
          case 'mostUpvotes':
            return requests.sort((a, b) => b.upvotes! - a.upvotes!);
          case 'leastUpvotes':
            return requests.sort((a, b) => a.upvotes! - b.upvotes!);
          case 'mostComments':
            return requests.sort(
              (a, b) => b.comments!.length - a.comments!.length
            );
          case 'leastComments':
            return requests.sort(
              (a, b) => a.comments!.length - b.comments!.length
            );
          default:
            return requests;
        }
      })
    );
  }
}
