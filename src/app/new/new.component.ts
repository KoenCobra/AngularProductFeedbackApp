import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

interface Category {
  value: string;
}

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent {
  constructor(private http: HttpClient) {
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
    // this.http.post<Category>('')
  }


}
