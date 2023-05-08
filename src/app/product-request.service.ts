import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {productRequest} from './product-request';
import {HttpClient} from '@angular/common/http';
import {comment} from "./comment";
import {Reply} from "./reply";

@Injectable({
  providedIn: 'root',
})
export class ProductRequestService {
  public productRequests$ = new BehaviorSubject<productRequest[]>([]);
  public selectedCategory$ = new BehaviorSubject<string>('all');

  constructor(private http: HttpClient) {
    this.init();
  }

  public getAllProductRequests(): Observable<productRequest[]> {
    return combineLatest([this.productRequests$, this.selectedCategory$]).pipe(
      map(([requests, category]) =>
        category === 'all'
          ? requests
          : requests.filter((request) => request.category === category),
      ),
    );
  }

  public getProductRequestById(id: number): Observable<productRequest | null> {
    return this.productRequests$.pipe(
      map((requests) => {
        const productRequest = requests.find((request) => request.id === id);
        return productRequest ? productRequest : null;
      })
    );
  }

  public addProductRequest(item: productRequest): void {
    this.productRequests$.next([...this.productRequests$.getValue(), item]);
  }

  public init(): void {
    this.http
      .get<any>('/assets/data.json')
      .pipe(map((response) => response['productRequests']))
      .subscribe((response) => {
        this.productRequests$.next(response);
      });
  }

  public changeCategory(category: string): void {
    this.selectedCategory$.next(category);
  }

  public getCurrentCategory(): string {
    return this.selectedCategory$.getValue();
  }

  addComment(requestId: number, comment: comment) {
    const currentProductRequests = this.productRequests$.getValue();
    const request = currentProductRequests.find(request => request.id === requestId);

    if (request) {
      const newComment = {
        id: Date.now(),
        content: comment.content,
        user: comment.user,
      };

      const updatedProductRequest: productRequest = {
        ...request,
        comments: [...(request.comments || []), newComment],
      };

      const updatedProductRequests =
        currentProductRequests.map(productRequest => productRequest.id === requestId ? updatedProductRequest : productRequest);
      this.productRequests$.next(updatedProductRequests);
    }
  }

  public addReply(requestId: number, commentId: number, reply: Reply): void {
    const currentProductRequests = this.productRequests$.getValue();
    const request = currentProductRequests.find(request => request.id === requestId);

    if (request) {
      const comment = request.comments?.find(comment => comment.id === commentId);

      if (comment) {
        comment.replies = comment.replies ? [...comment.replies, reply] : [reply];

        const updatedRequest = {
          ...request,
          comments: request.comments?.map(c => c.id === commentId ? comment : c),
        };

        const updatedProductRequests =
          currentProductRequests.map(
            productRequest => productRequest.id === requestId ? updatedRequest : productRequest);
        this.productRequests$.next(updatedProductRequests);
      }
    }
  }

  public updateProductRequest(updatedRequest: productRequest): void {
    const currentProductRequests = this.productRequests$.getValue();
    const updatedProductRequests = currentProductRequests.map(request => request.id === updatedRequest.id ? updatedRequest : request);
    this.productRequests$.next(updatedProductRequests);
  }


  public deleteRequest(requestId: number): void {
    const currentProductRequests = this.productRequests$.getValue();
    const updatedProductRequests = currentProductRequests.filter(request => request.id !== requestId);
    this.productRequests$.next(updatedProductRequests);
  }

}
