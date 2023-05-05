import {Component, Input} from '@angular/core';
import {productRequests} from "../../product-requests";

@Component({
  selector: 'app-feedback-request',
  templateUrl: './feedback-request.component.html',
  styleUrls: ['./feedback-request.component.scss']
})
export class FeedbackRequestComponent {
@Input() feedbackRequest!: productRequests;
}
