import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../api.service";

interface Category {
  value: string;
}

interface createRequest{

}

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent {
  constructor(private apiService: ApiService) {
  }

  categories: Category[] = [
    {value: 'Feature'},
    {value: 'UI'},
    {value: 'UX'},
    {value: 'Enhancement'},
    {value: 'Bug'}
  ];

  feedbackForm = new FormGroup({
    feedbackTitle: new FormControl( '',[Validators.required]),
    feedbackCategory: new FormControl(this.categories[0].value, [Validators.required]),
    feedbackDetail: new FormControl('', [Validators.required])
  })

  onSubmit() {
    if (this.feedbackForm.invalid) {
      this.feedbackForm.markAllAsTouched();
      return;
    }
    const feedbackData = {
      title: this.feedbackForm.controls.feedbackTitle.value,
      category: this.feedbackForm.controls.feedbackCategory.value,
      detail: this.feedbackForm.controls.feedbackDetail.value
    };
    this.apiService.createProductRequests(feedbackData).subscribe((response) => {
      console.log(response);
    });
  }
}
