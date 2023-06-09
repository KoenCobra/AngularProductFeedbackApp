import {Component, OnDestroy, OnInit} from '@angular/core';
import {productRequest} from '../product-request';
import {ProductRequestService} from '../product-request.service';
import {Observable, Subscription} from 'rxjs';
import {map} from "rxjs/operators";

@Component({
  selector: 'app-product-request',
  templateUrl: './product-request.component.html',
  styleUrls: ['./product-request.component.scss'],
})
export class ProductRequestComponent implements OnInit, OnDestroy {
  productRequests$: Observable<productRequest[]> = new Observable<productRequest[]>();
  isMenuShowing: boolean = false;
  private subscription!: Subscription;

  constructor(private requestService: ProductRequestService) {
  }

  ngOnInit(): void {
    this.productRequests$ = this.requestService.getAllProductRequests();
    this.subscription = this.requestService.isMenuShowing$.subscribe(
      value => {
        this.isMenuShowing = value;
      }
    );
  }

  onSortCriterionChange(criterion: string): void {
    this.productRequests$ = this.productRequests$.pipe(
      map((requests) => {
        switch (criterion) {
          case 'Most Upvotes':
            return requests.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
          case 'Least Upvotes':
            return requests.sort((a, b) => (a.upvotes || 0) - (b.upvotes || 0));
          case 'Most Comments':
            return requests.sort(
              (a, b) => (b.comments?.length || 0) - (a.comments?.length || 0)
            );
          case 'Least Comments':
            return requests.sort(
              (a, b) => (a.comments?.length || 0) - (b.comments?.length || 0)
            );
          default:
            return requests;
        }
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
