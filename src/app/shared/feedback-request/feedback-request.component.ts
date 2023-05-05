import {Component, Input} from '@angular/core';
import {productRequest} from "../../product-request";

@Component({
  selector: 'app-feedback-request',
  templateUrl: './feedback-request.component.html',
  styleUrls: ['./feedback-request.component.scss']
})
export class FeedbackRequestComponent {
@Input() feedbackRequest!: productRequest | null;
}
