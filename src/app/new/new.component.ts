import {Component, TemplateRef} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../api.service";
import {Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";

interface Category {
  value: string;
}

interface createRequest {

}

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent {
  constructor(private apiService: ApiService, private router: Router, private toast: NgToastService) {
  }

  customSnackBarTemplate!: TemplateRef<any>;

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
    const feedbackData = {
      title: this.feedbackForm.controls.feedbackTitle.value,
      category: this.feedbackForm.controls.feedbackCategory.value,
      description: this.feedbackForm.controls.feedbackDescription.value
    };
    this.apiService.createProductRequests(feedbackData).subscribe((response) => {
      if (response === feedbackData) {
        this.toast.success({detail: "SUCCESS", summary: 'Request successfully added', duration: 5000});
        this.router.navigateByUrl('/');
      } else {
        this.toast.error({detail: "ERROR", summary: 'Something went wrong', sticky: true});
      }
    });
  }
}
