import {Component, EventEmitter, Input, Output} from '@angular/core';
import {data} from "../product-requests";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
// side-bar.component.ts
export class SideBarComponent {
  @Input() data: data = {productRequests: []};
  @Output() categoryChange = new EventEmitter<string>();

  categories = ['all', 'UI', 'UX', 'enhancement', 'bug', 'feature'];

  changeCategory(category: string) {
    this.categoryChange.emit(category);
  }
}

