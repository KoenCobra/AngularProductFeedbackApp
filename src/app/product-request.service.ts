import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {productRequests} from "./product-requests";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductRequestService {
  private productRequests$ = new BehaviorSubject<productRequests[]>([]);

  constructor(private http: HttpClient) {
  }

  public getAllProductRequests(): Observable<productRequests[]> {
    return this.productRequests$;
  }

  public init() {
    return this.http.get<productRequests[]>('/assets/data.json').subscribe((response => {
      this.productRequests$.next(response);
    }));
  }

  public changeCategory(category: string): Observable<productRequests[]> {
    return this.productRequests$.pipe(
      map((requests) =>
        requests.filter((request) =>
          request.category === category)));
  }
}
