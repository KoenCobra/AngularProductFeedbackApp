import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { productRequests} from "./product-requests";
import {map, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private localStorageKey = 'productRequests';

  constructor(private http: HttpClient) {
  }

  getAllProductRequests() {
    return this.http.get<any>('/assets/data.json')
      .pipe(
        map(response => response['productRequests'])
      );
  }

  createProductRequests(createRequest: any) {
    let productRequests = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    productRequests.push(createRequest);
    localStorage.setItem(this.localStorageKey, JSON.stringify(productRequests));
    return of(createRequest);
  }
}
