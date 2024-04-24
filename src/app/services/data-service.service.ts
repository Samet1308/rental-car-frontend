import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Brand} from "../brand/brand";
import {Car} from "../car/car";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  getCarData(): Observable<Car> {
    return this.http.get<any>('http://localhost:8081/api/cars');
  }

}
