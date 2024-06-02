import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzButtonSize} from "ng-zorro-antd/button";
import {AdminServiceService} from "../../services/admin-service.service";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{
  brands: any=[];
  validateForm! : FormGroup;
  size: NzButtonSize = 'large';
  isSpinning:boolean
  constructor(
    private adminService:AdminServiceService,
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


  submitForm(){
    this.isSpinning = true
    this.brands=[]
    this.adminService.getAllBrandsByTitle(this.validateForm.get(['title']).value).subscribe((res)=>{
      console.log(res)
      res.forEach(element =>{
        element.processedImg='data:image/jpeg;base64,'+ element.returnedImage;
        this.brands.push(element)
        this.isSpinning=false
      })
    })
  }
  onSearchInputChange() {
    const title = this.validateForm.get(['title'])!.value;
    if (!title) {
      this.getAllBrands();
    }
  }
  getAllBrands(){
    this.brands=[]
    this.adminService.getAllBrands().subscribe((res)=>{
      res.forEach(element =>{
        element.processedImg='data:image/jpeg;base64,'+ element.returnedImage;
        this.brands.push(element)
      })
    })
  }
}
