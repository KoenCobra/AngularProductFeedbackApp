import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Data} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ApiService{

  constructor(private http: HttpClient) {
  }

  getAllProductRequests(){
    return this.http.get<Data>('/assets/data.json');
  }
}
