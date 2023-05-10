import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ProductRequestService } from '../product-request.service';
import {Observable} from "rxjs";
import {productRequest} from "../product-request";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit{
  @Output() categoryChange: EventEmitter<string> = new EventEmitter<string>();
  productRequests$: Observable<productRequest[]> = new  Observable<productRequest[]>();

  currentCategory!: string;
  categories: string[] = ['all', 'UI', 'UX', 'enhancement', 'bug', 'feature'];

  plannedRequests$!: Observable<number>;
  inProgressRequests$!: Observable<number>;
  liveRequests$!: Observable<number>;

  constructor(private requestService: ProductRequestService) {
  }

  ngOnInit(): void {
    this.productRequests$ = this.requestService.getAllProductRequests();

    this.plannedRequests$ = this.productRequests$.pipe(
      map(requests => requests.filter(request => request.status === 'planned').length)
    );

    this.inProgressRequests$ = this.productRequests$.pipe(
      map(requests => requests.filter(request => request.status === 'in-progress').length)
    );

    this.liveRequests$ = this.productRequests$.pipe(
      map(requests => requests.filter(request => request.status === 'live').length)
    );
  }

  changeCategory(category: string): void {
    this.currentCategory = category;
    this.categoryChange.emit(category);
  }
}

