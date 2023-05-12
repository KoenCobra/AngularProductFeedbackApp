import {Component, OnInit} from '@angular/core';
import {ProductRequestService} from '../product-request.service';
import {Observable} from "rxjs";
import {productRequest} from "../product-request";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  isMenuShowing: boolean = false;

  constructor(private requestService: ProductRequestService) {
  }

  ngOnInit(): void {
    this.requestService.isMenuShowing$.subscribe(
      value => this.isMenuShowing = value
    );
  }

  toggleMenu() {
    this.requestService.toggleMenuVisibility();
  }
}
