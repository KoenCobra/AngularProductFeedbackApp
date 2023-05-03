import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";
import {ProductRequestService} from "../product-request.service";

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
    feedbackCategory: new FormControl(this.categories[0].value, [Validators.required]),
    feedbackDescription: new FormControl('', [Validators.required])
  })

  onSubmit() {
    if (this.feedbackForm.invalid) {
      this.feedbackForm.markAllAsTouched();
      return;
    }
    const newItem = {
      title: this.feedbackForm.controls.feedbackTitle.value ?? '',
      category: this.feedbackForm.controls.feedbackCategory.value ?? '',
      upvotes: 0,
      status: '',
      description: this.feedbackForm.controls.feedbackDescription.value ?? '',
      comments: [],
    };

    this.requestService.addProductRequest(newItem);
    this.toast.success({ detail: 'SUCCESS', summary: 'Request successfully added', duration: 5000 });
    this.router.navigateByUrl('/');
  }
}
