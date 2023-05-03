import { Component, EventEmitter, Output } from '@angular/core';
import { ProductRequestService } from '../product-request.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
  @Output() categoryChange: EventEmitter<string> = new EventEmitter<string>();

  currentCategory: string;
  categories: string[] = ['all', 'UI', 'UX', 'enhancement', 'bug', 'feature'];

  constructor(private requestService: ProductRequestService) {
    this.currentCategory = this.requestService.getCurrentCategory();
  }

  changeCategory(category: string): void {
    this.currentCategory = category;
    this.categoryChange.emit(category);
  }
}

