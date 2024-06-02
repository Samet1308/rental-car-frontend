import { Component } from '@angular/core';
import {CustomerService} from "../../services/customer.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {DatePipe} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzButtonModule} from "ng-zorro-antd/button";
import {StorageService} from "../../../../auth/services/storage/storage.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-book-car',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    NzSpinModule,
    NzFormModule,
    NzDatePickerModule,
    ReactiveFormsModule,
    NzButtonModule
  ],
  templateUrl: './book-car.component.html',
  styleUrls: ['./book-car.component.css']
})
export class BookCarComponent {

  carId: number = this.activatedRoute.snapshot.params["id"]
  processedImage : any
  car:any
  validatedForm! : FormGroup
  isSpinning = false
  dateFormat: "DD-MM-YYYY";

  constructor(
    private customerService : CustomerService,
    private activatedRoute:ActivatedRoute,
    private formBuilder : FormBuilder,
    private message : NzMessageService,
    private router : Router
  ) {
  }
  ngOnInit(){
    this.validatedForm=this.formBuilder.group({
      toDate : [null,Validators.required],
      fromDate : [null,Validators.required],
    })
    this.getCarById()
  }

  getCarById(){
    this.customerService.getCarById(this.carId).subscribe((res)=>{
      console.log(res)
      this.processedImage='data:image/jpeg;base64,'+ res.returnedImage;
      this.car = res
    })
  }


  bookACar(data: any):void {
    this.isSpinning = true
    console.log(data);
    let bookCarDto = {
      toDate: data.toDate,
      fromDate: data.fromDate,
      userId: StorageService.getUserId(),
      carId:this.carId
    }
    this.customerService.bookCar(bookCarDto).subscribe((res) => {
      this.isSpinning = false
        console.log(res)
      this.message.success("Araba Kiralandı.",{nzDuration:5000})
    }, error => {
      this.message.error("Something went wrong", {nzDuration:5000})
    })

  }
}
