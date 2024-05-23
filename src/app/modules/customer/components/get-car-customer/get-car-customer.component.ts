import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzButtonModule, NzButtonSize} from "ng-zorro-antd/button";
import {AdminServiceService} from "../../../admin/services/admin-service.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {CustomerService} from "../../services/customer.service";
import {NgForOf} from "@angular/common";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzWaveModule} from "ng-zorro-antd/core/wave";

@Component({
  selector: 'app-get-car-customer',
  standalone: true,
  imports: [
    NgForOf,
    NzButtonModule,
    NzFormModule,
    NzGridModule,
    NzInputModule,
    NzWaveModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './get-car-customer.component.html',
  styleUrls: ['./get-car-customer.component.css']
})
export class GetCarCustomerComponent {
  modelId: number = this.activatedroute.snapshot.params['modelId']
  cars:any=[]
  validateForm! : FormGroup;
  isSpinning:boolean
  size: NzButtonSize = 'large';
  constructor(
    private customerService:CustomerService,
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

  getCarsByModel(){
    this.cars=[];
    this.customerService.getCarsByModel(this.modelId).subscribe((res)=>{
      res.forEach(element =>{
        element.processedImg='data:image/jpeg;base64,'+ element.returnedImage;
        this.cars.push(element)
      })
    })

  }

}
