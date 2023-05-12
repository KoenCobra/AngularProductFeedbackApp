import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductRequestService} from "../product-request.service";
import {productRequest} from "../product-request";
import {map} from "rxjs/operators";
import {Location} from "@angular/common";

interface Category {
  value: string;
}
interface Status {
  value: string;
}

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewComponent implements OnInit {
  requestId: string = '';
  productRequest!: productRequest | null;
  title: string = 'Create';
  btnText: string = 'Add';

  constructor(private router: Router, private requestService: ProductRequestService,
              private route: ActivatedRoute, private location: Location) {
  }

  ngOnInit(): void {
    this.requestId = this.route.snapshot.paramMap.get('id') || '';
    this.requestService.getProductRequestById(parseInt(this.requestId)).pipe(
      map((value) => this.productRequest = value)
    ).subscribe();
    this.initializeForm();
  }

  categories: Category[] = [
    {value: 'feature'},
    {value: 'UI'},
    {value: 'UX'},
    {value: 'enhancement'},
    {value: 'bug'}
  ];

  status: Status[] = [
    {value: 'suggestion'},
    {value: 'planned'},
    {value: 'in-progress'},
    {value: 'live'},
  ];

  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  feedbackForm = new FormGroup({
    feedbackTitle: new FormControl('', [Validators.required]),
    feedbackCategory: new FormControl(this.requestService.selectedCategory$.getValue()),
    feedbackStatus: new FormControl(''),
    feedbackDescription: new FormControl('', [Validators.required])
  })

  initializeForm() {
    if (this.productRequest) {
      this.title = 'Update';
      this.btnText = 'Update';
      this.feedbackForm.setValue({
        feedbackTitle: this.productRequest.title,
        feedbackCategory: this.productRequest.category,
        feedbackStatus: this.productRequest.status,
        feedbackDescription: this.productRequest.description,
      })
    }
  }

  updateRequest() {
    if (this.productRequest && this.feedbackForm.valid) {
      const updatedItem: productRequest = {
        ...this.productRequest,
        title: this.feedbackForm.controls.feedbackTitle.value,
        category: this.feedbackForm.controls.feedbackCategory.value,
        status: this.feedbackForm.controls.feedbackStatus.value,
        description: this.feedbackForm.controls.feedbackDescription.value,
      };

      this.requestService.updateProductRequest(updatedItem);
      this.location.back();
    }
  }

  onSubmit() {
    if (this.feedbackForm.invalid) {
      this.feedbackForm.markAllAsTouched();
      return;
    }

    if (this.productRequest) {
      this.updateRequest();
    } else {
      const newItem: productRequest = {
        id: Date.now(),
        upvotes: 0,
        title: this.feedbackForm.controls.feedbackTitle.value ?? '',
        category: this.feedbackForm.controls.feedbackCategory.value ?? '',
        description: this.feedbackForm.controls.feedbackDescription.value ?? '',
        status: this.feedbackForm.controls.feedbackStatus.value ?? 'suggestion'
      };

      this.requestService.addProductRequest(newItem);
      this.router.navigateByUrl('/');
    }
  }

  deleteRequest() {
    if (this.productRequest) {
      this.requestService.deleteRequest(this.productRequest.id);
      this.router.navigateByUrl('/');
    }
  }

  goBack() {
    this.location.back();
  }
}
