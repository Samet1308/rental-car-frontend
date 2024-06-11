import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzButtonModule, NzButtonSize} from "ng-zorro-antd/button";
import {AdminServiceService} from "../../services/admin-service.service";
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzFormModule} from "ng-zorro-antd/form";
import {NgForOf} from "@angular/common";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzCardModule} from "ng-zorro-antd/card";

@Component({
  selector: 'app-get-car',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    RouterLink,
    NgForOf,
    NzInputModule,
    NzCardModule,
    RouterLinkActive
  ],
  templateUrl: './get-car.component.html',
  styleUrls: ['./get-car.component.css']
})
export class GetCarComponent {
  modelId: number = this.activatedroute.snapshot.params['modelId']
  cars:any=[]
  validateForm! : FormGroup;
  isSpinning:boolean
  size: NzButtonSize = 'large';
  constructor(
    private adminService:AdminServiceService,
    private activatedroute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private message: NzMessageService,
    private router: Router) {
  }

  ngOnInit(){
    this.validateForm = this.formBuilder.group({
      title: [null, [Validators.required]]
    });
    this.getCarsByModel();
    this.validateForm.get(['title'])!.valueChanges.subscribe(() => {
      this.onSearchInputChange();
    });
  }
  onSearchInputChange() {
    const title = this.validateForm.get(['title'])!.value;
    if (!title) {
      this.getCarsByModel();
    }
  }
  submitForm(){
    this.isSpinning = true
    this.cars=[]
    this.adminService.getModelsByBrandAndTitle(this.modelId,this.validateForm.get(['title'])!.value).subscribe((res)=>{
      console.log(res)
      res.forEach(element =>{
        element.processedImg='data:image/jpeg;base64,'+ element.returnedImage;
        this.cars.push(element)
        this.isSpinning=false
      })
    })
  }

  getCarsByModel(){
    this.cars=[];
    this.adminService.getCarsByModel(this.modelId).subscribe((res)=>{
      res.forEach(element =>{
        element.processedImg='data:image/jpeg;base64,'+ element.returnedImage;
        this.cars.push(element)
      })
    })

  }

  deleteCar(carId: any) {
    this.adminService.deleteCar(carId).subscribe((res) => {
      if (res == null) {
        this.getCarsByModel()
        this.message
          .success(
            `Araç Başarıyla Silindi.`, {nzDuration: 5000}
          );
      } else {
        this.message.error(
          `Something went wrong`, {nzDuration: 5000})
      }
    });
  }
}
