import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {StorageService} from "../../../auth/services/storage/storage.service";


const BASIC_URL = ["http://localhost:8081"]

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private httpClient: HttpClient
  ) { }


  getAllBrands(): Observable<any> {
    return  this.httpClient.get<[]>(BASIC_URL+"/api/inventory/brands",
      {
        headers:this.createAuthorizationHeader()
      })
  }
  getModelsByBrand(branId:number): Observable<any> {
    return  this.httpClient.get<[]>(BASIC_URL+`/api/inventory/${branId}/models`,
      {
        headers:this.createAuthorizationHeader()
      })
  }

  getCarsByModel(modelId: number) : Observable<any> {
    return  this.httpClient.get<[]>(BASIC_URL+`/api/inventory/${modelId}/cars`,
      {
        headers:this.createAuthorizationHeader()
      })
  }
  getModelsByBrandAndTitle(brandId:number, title:string): Observable<any> {
    return  this.httpClient.get<[]>(BASIC_URL+`/api/inventory/${brandId}/model/${title}`,
      {
        headers:this.createAuthorizationHeader()
      })
  }

  getBrandsByName(title:string): Observable<any> {
    return  this.httpClient.get<[]>(BASIC_URL+`/api/inventory/brands/${title}`,
      {
        headers:this.createAuthorizationHeader()
      })
  }


  createAuthorizationHeader():HttpHeaders{
    let authHeaders:HttpHeaders = new HttpHeaders()
    return authHeaders.set(
      "Authorization","Bearer" + StorageService.getToken()
    )
  }

}
