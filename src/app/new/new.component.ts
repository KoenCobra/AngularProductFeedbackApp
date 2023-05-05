import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";
import {ProductRequestService} from "../product-request.service";
import {productRequest} from "../product-request";

interface Category {
  value: string;
}

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent {
  constructor(private router: Router, private toast: NgToastService, private requestService: ProductRequestService) {
  }

  categories: Category[] = [
    {value: 'Feature'},
    {value: 'UI'},
    {value: 'UX'},
    {value: 'Enhancement'},
    {value: 'Bug'}
  ];

  feedbackForm = new FormGroup({
    feedbackTitle: new FormControl('', [Validators.required]),
    feedbackCategory: new FormControl(this.categories[0].value),
    feedbackDescription: new FormControl('', [Validators.required])
  })

  onSubmit() {
    if (this.feedbackForm.invalid) {
      this.feedbackForm.markAllAsTouched();
      return;
    }
    const newItem: productRequest = {
      id: Date.now(),
      title: this.feedbackForm.controls.feedbackTitle.value ?? '',
      category: this.feedbackForm.controls.feedbackCategory.value ?? '',
      description: this.feedbackForm.controls.feedbackDescription.value ?? ''
    };

    this.requestService.addProductRequest(newItem);
    this.toast.success({detail: 'SUCCESS', summary: 'Request successfully added', duration: 5000, position: 'br'});
    this.router.navigateByUrl('/');
  }
}
