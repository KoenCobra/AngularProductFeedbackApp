import {Component, Input} from '@angular/core';
import {data} from "../product-requests";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input() data: data = { productRequests: [] };
}
