import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";
import {ProductRequestService} from "../product-request.service";
import {productRequest} from "../product-request";
import {map} from "rxjs/operators";
import {Location} from "@angular/common";

interface Category {
  value: string;
}

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  requestId: string = '';
  productRequest!: productRequest | null;
  title: string = 'Create';
  btnText: string = 'Add';

  constructor(private router: Router, private toast: NgToastService, private requestService: ProductRequestService,
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

  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  feedbackForm = new FormGroup({
    feedbackTitle: new FormControl('', [Validators.required]),
    feedbackCategory: new FormControl(this.requestService.selectedCategory$.getValue()),
    feedbackDescription: new FormControl('', [Validators.required])
  })

  initializeForm() {
    if (this.productRequest) {
      this.title = 'Update';
      this.btnText = 'Update';
      this.feedbackForm.setValue({
        feedbackTitle: this.productRequest.title,
        feedbackCategory: this.productRequest.category,
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
        description: this.feedbackForm.controls.feedbackDescription.value,
      };

      this.requestService.updateProductRequest(updatedItem);
      this.toast.success({detail: 'SUCCESS', summary: 'Request successfully updated', duration: 4000, position: 'br'});
      this.router.navigateByUrl('/');
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
        description: this.feedbackForm.controls.feedbackDescription.value ?? ''
      };

      this.requestService.addProductRequest(newItem);
      this.toast.success({detail: 'SUCCESS', summary: 'Request successfully added', duration: 4000, position: 'br'});
      this.router.navigateByUrl('/');
    }
  }

  deleteRequest() {
    if (this.productRequest) {
      this.requestService.deleteRequest(this.productRequest.id);
      this.toast.success({
        detail: 'SUCCESS',
        summary: 'Request successfully deleted',
        duration: 4000,
        position: 'br',
      });
      this.router.navigateByUrl('/');
    }
  }

  goBack() {
    this.location.back();
  }
}
