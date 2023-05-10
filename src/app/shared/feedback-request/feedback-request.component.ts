import {Component, Input} from '@angular/core';
import {productRequest} from "../../product-request";
import {ProductRequestService} from "../../product-request.service";

@Component({
  selector: 'app-feedback-request',
  templateUrl: './feedback-request.component.html',
  styleUrls: ['./feedback-request.component.scss']
})
export class FeedbackRequestComponent {
  @Input() feedbackRequest!: productRequest | null;

  constructor(private productRequestService: ProductRequestService) {}

  upVote() {
    if (this.feedbackRequest) {
      this.productRequestService.upvoteProductRequest(this.feedbackRequest.id);
    }
  }
}
