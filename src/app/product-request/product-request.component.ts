import {Component, Input} from '@angular/core';
import {data} from "../product-requests";

@Component({
  selector: 'app-product-request',
  templateUrl: './product-request.component.html',
  styleUrls: ['./product-request.component.scss']
})
export class ProductRequestComponent {
  @Input() data: data = {productRequests: []};
}
