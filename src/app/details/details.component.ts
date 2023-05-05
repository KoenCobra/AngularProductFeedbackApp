import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {ProductRequestService} from "../product-request.service";
import {productRequests} from "../product-requests";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  requestId: string = '';
  productRequest!: productRequests | null;

  commentForm = new FormGroup({
    comment: new FormControl('', Validators.required)
  })

  constructor(private route: ActivatedRoute, private requestService: ProductRequestService) {
  }

  ngOnInit(): void {
    this.requestId = this.route.snapshot.paramMap.get('id') || '';
    this.requestService.getProductRequestById(parseInt(this.requestId)).pipe(
      map((value) => this.productRequest = value)
    ).subscribe();
  }

  commentFormSubmit() {
  }
}
