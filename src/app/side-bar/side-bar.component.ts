import {Component, EventEmitter, Input, Output} from '@angular/core';
import {data} from "../product-requests";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
// side-bar.component.ts
export class SideBarComponent {
  @Output() categoryChange: EventEmitter<string> = new EventEmitter<string>();

  currentCategory: string = 'all';
  categories: string[] = ['all', 'UI', 'UX', 'enhancement', 'bug', 'feature'];

  changeCategory(category: string): void {
    this.currentCategory = category;
    this.categoryChange.emit(category);
  }
}

