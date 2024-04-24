import { Injectable } from '@angular/core';
import {Brand} from "../brand/brand";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class BrandService {

  constructor(
    private httpClient : HttpClient
  ) {}
  getBrands(): Observable<Brand[]> {
   return  this.httpClient.get<any>("http://localhost:8081/api/brands")
  }
}
