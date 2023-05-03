import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {productRequests} from './product-requests';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductRequestService {
  private productRequests$ = new BehaviorSubject<productRequests[]>([]);
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
}
