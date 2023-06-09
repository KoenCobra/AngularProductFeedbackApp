import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {productRequest} from "../product-request";
import {Observable} from "rxjs";
import {ProductRequestService} from "../product-request.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  constructor(private requestService: ProductRequestService) {
  }

  @Output() sortCriterionChange: EventEmitter<string> = new EventEmitter<string>();
  public productRequests$: Observable<productRequest[]> = new Observable<productRequest[]>()
  isSortDropdownOpen = false;
  selectedSortCriterion = 'Most Upvotes';

  toggleSortDropdown(): void {
    this.isSortDropdownOpen = !this.isSortDropdownOpen;
  }
  onClickOutside(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;
    if (!targetElement.closest('.sort') && this.isSortDropdownOpen) {
      this.isSortDropdownOpen = false;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    this.onClickOutside(event);
  }
  ngOnInit(): void {
    this.productRequests$ = this.requestService.getAllProductRequests();
  }
  sortProductRequests(criterion: string): void {
    this.sortCriterionChange.emit(criterion);
    this.isSortDropdownOpen = !this.isSortDropdownOpen;
    this.selectedSortCriterion = criterion;
  }
}
