import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {productRequest} from "../../product-request";
import {ProductRequestService} from "../../product-request.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-roadmap-nav',
  templateUrl: './roadmap-nav.component.html',
  styleUrls: ['./roadmap-nav.component.scss']
})
export class RoadmapNavComponent implements OnInit {
  @Input() toggleVisibilityOnNavigation: boolean = false;
  productRequests$: Observable<productRequest[]> = new Observable<productRequest[]>();
  plannedRequests$!: Observable<number>;
  inProgressRequests$!: Observable<number>;
  liveRequests$!: Observable<number>;

  constructor(private requestService: ProductRequestService, private router: Router) {
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

  navigateToRoadmap() {
    this.router.navigateByUrl('roadmap');
    if (this.toggleVisibilityOnNavigation) {
      this.requestService.toggleMenuVisibility();
    }
  }
}
