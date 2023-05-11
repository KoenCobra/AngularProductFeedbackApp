import {Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {productRequest} from './product-request';
import {HttpClient} from '@angular/common/http';
import {comment} from "./comment";
import {Reply} from "./reply";
import {NgToastService} from "ng-angular-popup";

@Injectable({
  providedIn: 'root',
})
export class ProductRequestService {
  public productRequests$ = new BehaviorSubject<productRequest[]>([]);
  public selectedCategory$ = new BehaviorSubject<string>('all');
  public isMenuShowing$ = new BehaviorSubject<boolean>(false);
  private localStorageKey = 'productRequests';
  private renderer!: Renderer2;
  constructor(private http: HttpClient, private toast: NgToastService, rendererFactory: RendererFactory2,) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.init();
  }

  public init(): void {
    const localStorageData = this.loadFromLocalStorage();
    if (localStorageData) {
      this.productRequests$.next(localStorageData);
    } else {
      this.http
        .get<any>('/assets/data.json')
        .pipe(map((response) => response['productRequests']))
        .subscribe((response) => {
          this.productRequests$.next(response);
          this.saveToLocalStorage(response);
        });
    }
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
    this.saveChanges([...this.productRequests$.getValue(), item]);
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

      this.saveChanges(updatedProductRequests);
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

        this.saveChanges(updatedProductRequests);
      }
    }
  }

  public updateProductRequest(updatedRequest: productRequest): void {
    const currentProductRequests = this.productRequests$.getValue();
    const updatedProductRequests = currentProductRequests.map(request => request.id === updatedRequest.id ? updatedRequest : request);

    this.saveChanges(updatedProductRequests);
  }


  public deleteRequest(requestId: number): void {
    const currentProductRequests = this.productRequests$.getValue();
    const updatedProductRequests = currentProductRequests.filter(request => request.id !== requestId);

    this.saveChanges(updatedProductRequests);
  }

  public updateProductRequestStatus(requestId: number, status: string): void {
    const currentProductRequests = this.productRequests$.getValue();
    const updatedProductRequests = currentProductRequests.map(request => {
      if (request.id === requestId) {
        return {...request, status};
      } else {
        return request;
      }
    });

    this.saveChanges(updatedProductRequests);
  }

  public upvoteProductRequest(requestId: number): void {
    const currentProductRequests = this.productRequests$.getValue();
    const request = currentProductRequests.find(request => request.id === requestId);

    if (request && !request.userHasUpvoted) {
      request.upvotes += 1;
      request.userHasUpvoted = true;
      this.toast.success({
        detail: 'SUCCESS',
        summary: 'Upvote is registered',
        duration: 4000,
        position: 'br',
      });
      const updatedProductRequests =
        currentProductRequests.map(productRequest => productRequest.id === requestId ? request : productRequest);
      this.saveChanges(updatedProductRequests);
    } else {
      this.toast.error({
        detail: 'Take it easy...',
        summary: 'You can only upvote once',
        duration: 4000,
        position: 'br',
      });
    }
  }

  saveChanges(productRequests: productRequest[]) {
    this.productRequests$.next(productRequests);
    this.saveToLocalStorage(productRequests);
  }

  private saveToLocalStorage(data: productRequest[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(data));
  }

  private loadFromLocalStorage(): productRequest[] | null {
    const data = localStorage.getItem(this.localStorageKey);
    return data ? JSON.parse(data) : null;
  }

  public toggleMenuVisibility(): void {
    const currentValue = this.isMenuShowing$.getValue();
    this.isMenuShowing$.next(!currentValue);

    if (!currentValue) {
      this.renderer.addClass(document.body, 'no-scroll');
    } else {
      this.renderer.removeClass(document.body, 'no-scroll');
    }
  }
}
