import {Component, Input} from '@angular/core';
import {productRequests} from "../product-requests";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  @Input() productRequest!: productRequests | null;
}
