import {Component, Input, ViewEncapsulation} from '@angular/core';
import {productRequest} from '../product-request';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Reply} from "../reply";
import {ProductRequestService} from "../product-request.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CommentComponent {
  @Input() productRequest!: productRequest | null;
  @Input() totalComments!: number | undefined;
  activeReplyCommentId: number | null = null;

  constructor(private productRequestService: ProductRequestService) {
  }

  replyForm = new FormGroup({
    reply: new FormControl('', Validators.required),
  });

  showReply(commentId: number) {
    this.activeReplyCommentId = this.activeReplyCommentId === commentId ? null : commentId;
  }

  isReplyShowing(commentId: number): boolean {
    return this.activeReplyCommentId === commentId;
  }

  onReplySubmit(commentId: number) {
    if (this.replyForm.invalid) {
      this.replyForm.markAllAsTouched();
      return;
    }

    if (this.productRequest) {
      const comment = this.productRequest.comments?.find(c => c.id === commentId)

      const replyData: Reply = {
        content: this.replyForm.controls.reply.value,
        replyingTo: comment?.user?.username || null,
        user: {
          image: 'assets/user-images/image-judah.jpg',
          name: 'Judah',
          username: 'Judah',
        },
      };

      this.productRequestService.addReply(this.productRequest.id, commentId, replyData);
      this.replyForm.reset();
      this.activeReplyCommentId = -1
    }
  }
}
