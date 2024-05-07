import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

const BASE_URL= ["http://localhost:8082"]
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient : HttpClient
  ) { }

  register( signupRequest: any): Observable<any> {
    return  this.httpClient.post(BASE_URL+"/api/auth/signup",signupRequest)
  }

  login(loginRequest: any): Observable<any>{
    return this.httpClient.post(BASE_URL+"/api/auth/login", loginRequest)
  }

}
