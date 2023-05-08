import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductRequestService} from "../product-request.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {map} from "rxjs/operators";
import {comment} from "../comment";
import {productRequest} from "../product-request";
import {InputComponent} from "../shared/input/input.component";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  requestId: string = '';
  productRequest!: productRequest | null;
  @ViewChild(InputComponent, {static: false}) inputComponent!: InputComponent;

  commentForm = new FormGroup({
    comment: new FormControl('', Validators.required)
  })

  constructor(private route: ActivatedRoute, private requestService: ProductRequestService) {
  }

  ngOnInit(): void {
    this.requestId = this.route.snapshot.paramMap.get('id') || '';
    this.requestService.getProductRequestById(parseInt(this.requestId)).pipe(
      map((value) => this.productRequest = value)
    ).subscribe();
  }

  commentFormSubmit() {
    if (this.commentForm.invalid) {
      this.commentForm.markAllAsTouched();
      return;
    }

    if (this.productRequest) {
      const commentData: comment = {
        content: this.commentForm.controls.comment.value,
        user: {
          image: 'assets/user-images/image-judah.jpg',
          name: 'Judah',
          username: 'Judah',
        }
      };

      this.requestService.addComment(this.productRequest.id, commentData);
      this.commentForm.reset();
      this.inputComponent.charactersLeft = this.inputComponent.maxLength;
    }
  }
}
