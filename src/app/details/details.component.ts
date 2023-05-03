import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable, switchMap} from "rxjs";
import {ProductRequestService} from "../product-request.service";
import {productRequests} from "../product-requests";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  requestId: string = '';
  public productRequest$!: Observable<productRequests | null>;

  constructor(private route: ActivatedRoute, private requestService: ProductRequestService) {
  }

  ngOnInit(): void {
    this.requestId = this.route.snapshot.paramMap.get('id') || '';
    this.productRequest$ = this.requestService.getProductRequestById(parseInt(this.requestId));
  }
}
