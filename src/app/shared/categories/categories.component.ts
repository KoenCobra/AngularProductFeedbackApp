import {Component, EventEmitter, Output} from '@angular/core';
import {ProductRequestService} from "../../product-request.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  currentCategory!: string;
  categories: string[] = ['all', 'UI', 'UX', 'enhancement', 'bug', 'feature'];

  constructor(private requestService: ProductRequestService) {
    this.currentCategory = this.requestService.getCurrentCategory();
  }

  changeCategory(category: string): void {
    this.currentCategory = category;
    this.requestService.changeCategory(category);
  }
}
