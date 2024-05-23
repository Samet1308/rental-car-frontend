import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzButtonSize} from "ng-zorro-antd/button";
import {AdminServiceService} from "../../../admin/services/admin-service.service";
import {CustomerService} from "../../services/customer.service";

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent {
  brands: any=[];
  validateForm! : FormGroup;
  size: NzButtonSize = 'large';
  isSpinning:boolean
  constructor(
    private customerService:CustomerService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(){
    this.validateForm = this.formBuilder.group({
      title: [null, [Validators.required]]
    });
    this.getAllBrands();
    this.validateForm.get(['title'])!.valueChanges.subscribe(() => {
      this.onSearchInputChange();
    });
  }

  onSearchInputChange() {
    const title = this.validateForm.get(['title'])!.value;
    if (!title) {
      this.getAllBrands();
    }
  }
  getAllBrands(){
    this.brands=[]
    this.customerService.getAllBrands().subscribe((res)=>{
      res.forEach(element =>{
        element.processedImg='data:image/jpeg;base64,'+ element.returnedImage;
        this.brands.push(element)
      })
    })
  }

}
