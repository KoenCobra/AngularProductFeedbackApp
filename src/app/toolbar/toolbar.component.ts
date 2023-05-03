import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {productRequests} from "../product-requests";
import {Observable} from "rxjs";
import {ProductRequestService} from "../product-request.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  constructor(private requestService: ProductRequestService) {
  }

  @Output() sortCriterionChange: EventEmitter<string> = new EventEmitter<string>();
  public productRequests$: Observable<productRequests[]> = new Observable<productRequests[]>()
  isSortDropdownOpen = false;

  toggleSortDropdown(): void {
    this.isSortDropdownOpen = !this.isSortDropdownOpen;
  }
  onClickOutside(): void {
    this.isSortDropdownOpen = false;
  }
  ngOnInit(): void {
    this.productRequests$ = this.requestService.getAllProductRequests();
  }
  sortProductRequests(criterion: string): void {
    this.sortCriterionChange.emit(criterion);
    this.isSortDropdownOpen = !this.isSortDropdownOpen;
  }
}
