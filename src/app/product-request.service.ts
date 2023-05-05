import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {productRequests} from './product-requests';
import {HttpClient} from '@angular/common/http';
import {comment} from "./comment";

@Injectable({
  providedIn: 'root',
})
export class ProductRequestService {
  public productRequests$ = new BehaviorSubject<productRequests[]>([]);
  private selectedCategory$ = new BehaviorSubject<string>('all');
  constructor(private http: HttpClient) {
    this.init();
  }
  public getAllProductRequests(): Observable<productRequests[]> {
    return combineLatest([this.productRequests$, this.selectedCategory$]).pipe(
      map(([requests, category]) =>
        category === 'all'
          ? requests
          : requests.filter((request) => request.category === category),
      ),
    );
  }

  public getProductRequestById(id: number): Observable<productRequests | null> {
    return this.productRequests$.pipe(
      map((requests) => {
        const productRequest = requests.find((request) => request.id === id);
        return productRequest ? productRequest : null;
      })
    );
  }
  public addProductRequest(item: productRequests): void {
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

      const updatedProductRequest: productRequests = {
        ...request,
        comments: [...(request.comments || []), newComment],
      };

      const updatedProductRequests =
        currentProductRequests.map(productRequest => productRequest.id === requestId ? updatedProductRequest : productRequest);
      this.productRequests$.next(updatedProductRequests);
    }
  }

}
