import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {StorageService} from "../../../auth/services/storage/storage.service";
import {Observable} from "rxjs";

const BASIC_URL = ["http://localhost:8081"]
const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(
    private httpClient : HttpClient
  ) { }



  createAuthorizationHeader():HttpHeaders{
    let authHeaders:HttpHeaders = new HttpHeaders()
    return authHeaders.set(
      "Authorization","Bearer" + StorageService.getToken()
    )
  }

  postBrand(brandDto: any): Observable<any> {
    return  this.httpClient.post<[]>(BASIC_URL+"/api/inventory/brand",brandDto,
      {
        headers:this.createAuthorizationHeader()
      })
  }
  postModel( brandId:number, modelDto: any): Observable<any> {
    return  this.httpClient.post<[]>(BASIC_URL+`/api/inventory/${brandId}/model`,modelDto,
      {
        headers:this.createAuthorizationHeader()
      })
  }
  getAllBrands(): Observable<any> {
    return  this.httpClient.get<[]>(BASIC_URL+"/api/inventory/brands",
      {
        headers:this.createAuthorizationHeader()
      })
  }
  getAllBrandsByTitle(title:string): Observable<any> {
    return  this.httpClient.get<[]>(BASIC_URL+`/api/inventory/brands/${title}`,
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

  getModelsByBrandAndTitle(brandId:number, title:string): Observable<any> {
    return  this.httpClient.get<[]>(BASIC_URL+`/api/inventory/${brandId}/model/${title}`,
      {
        headers:this.createAuthorizationHeader()
      })
  }

  postCar(modelId:number, carDto:any): Observable<any>{
    return this.httpClient.post<[]>(BASIC_URL + `/api/inventory/${modelId}/car`, carDto,
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

  deleteModel(modelId:number): Observable<any> {
    return  this.httpClient.delete<[]>(BASIC_URL+`/api/inventory/model/${modelId}`,
      {
        headers:this.createAuthorizationHeader()
      })
  }
  deleteCar(carId:number): Observable<any> {
    return  this.httpClient.delete<[]>(BASIC_URL+`/api/inventory/car/${carId}`,
      {
        headers:this.createAuthorizationHeader()
      })
  }
}
