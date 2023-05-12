import {Component, Input} from '@angular/core';
import {ProductRequestService} from "../../product-request.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  @Input() toggleVisibilityOnCategoryChange: boolean = false;
  currentCategory!: string;
  categories: string[] = ['all', 'UI', 'UX', 'enhancement', 'bug', 'feature'];

  constructor(private requestService: ProductRequestService) {
    this.currentCategory = this.requestService.getCurrentCategory();
  }

  changeCategory(category: string): void {
    this.currentCategory = category;
    this.requestService.changeCategory(category);
    if (this.toggleVisibilityOnCategoryChange) {
      this.requestService.toggleMenuVisibility();
    }
  }
}
