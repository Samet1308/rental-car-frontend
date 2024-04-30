import {Component, OnInit} from '@angular/core';
import {Car} from "./car";
import {AlertifyService} from "../services/alertify.service";
import {DataService} from "../services/data-service.service";

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit{
  cars: any;
  constructor(
    private dataService : DataService,
    private  alertifyService :AlertifyService) { }

  title= "Otomobil"
  filterText = ""

  ngOnInit():void{
    this.dataService.getCarData().subscribe(response => {
      console.log(response)
      this.cars=response});
  }

  addToCard(car: any){
    this.alertifyService.success("Araç kiralama işleminiz başarıyla kaydedilmiştir.")
  }
}
