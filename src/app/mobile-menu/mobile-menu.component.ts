import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductRequestService} from "../product-request.service";
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent implements OnInit, OnDestroy {
  isMenuShowing: boolean = false;
  private subscription!: Subscription;

  constructor(private requestService: ProductRequestService) {
  }

  ngOnInit(): void {
    this.subscription = this.requestService.isMenuShowing$.subscribe(
      value => this.isMenuShowing = value
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
