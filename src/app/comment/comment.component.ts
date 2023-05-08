import { Component, Input } from '@angular/core';
import { productRequest } from '../product-request';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input() productRequest!: productRequest | null;
  @Input() totalComments!: number | undefined;
  activeReplyCommentId: number | null = null;

  replyForm = new FormGroup({
    reply: new FormControl(''),
  });
  showReply(commentId: number) {
    this.activeReplyCommentId = this.activeReplyCommentId === commentId ? null : commentId;
  }
  isReplyShowing(commentId: number): boolean {
    return this.activeReplyCommentId === commentId;
  }
}
