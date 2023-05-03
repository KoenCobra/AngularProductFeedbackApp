import {Component, OnInit} from '@angular/core';
import {productRequests} from "../product-requests";
import {Observable} from "rxjs";
import {ProductRequestService} from "../product-request.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  public productRequests$: Observable<productRequests[]> = new Observable<productRequests[]>()

  constructor(private requestService: ProductRequestService) {
  }

  ngOnInit(): void {
    this.productRequests$ = this.requestService.getAllProductRequests();
  }
}
