import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {data} from "./product-requests";

@Injectable({
  providedIn: 'root'
})
export class ApiService{

  constructor(private http: HttpClient) {
  }

  getAllProductRequests(){
    return this.http.get<data>('/assets/data.json');
  }
}
