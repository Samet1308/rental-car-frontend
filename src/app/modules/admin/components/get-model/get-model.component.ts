import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzButtonModule, NzButtonSize} from "ng-zorro-antd/button";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {AdminServiceService} from "../../services/admin-service.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {NgForOf} from "@angular/common";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";

@Component({
  selector: 'app-get-model',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    RouterLink,
    NgForOf,
    NzFormModule,
    NzInputModule
  ],
  templateUrl: './get-model.component.html',
  styleUrls: ['./get-model.component.css']
})
export class GetModelComponent {
  brandId: number = this.activatedroute.snapshot.params['brandId']
  models:any=[]
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
    this.getModelsByBrand();
    this.validateForm.get(['title'])!.valueChanges.subscribe(() => {
      this.onSearchInputChange();
    });
  }
  onSearchInputChange() {
    const title = this.validateForm.get(['title'])!.value;
    if (!title) {
      this.getModelsByBrand();
    }
  }
  submitForm(){
    this.isSpinning = true
    this.models=[]
    this.adminService.getModelsByBrandAndTitle(this.brandId,this.validateForm.get(['title'])!.value).subscribe((res)=>{
      console.log(res)
      res.forEach(element =>{
        element.processedImg='data:image/jpeg;base64,'+ element.returnedImage;
        this.models.push(element)
        this.isSpinning=false
      })
    })
  }

  getModelsByBrand(){
    this.models=[];
    this.adminService.getModelsByBrand(this.brandId).subscribe((res)=>{
      res.forEach(element =>{
        element.processedImg='data:image/jpeg;base64,'+ element.returnedImage;
        this.models.push(element)
      })
    })
  }

  deleteModel(modelId: any) {
    this.adminService.deleteModel(modelId).subscribe((res) => {
      if (res == null) {
        this.getModelsByBrand()
        this.message
          .success(
            `Ürün Başarıyla Silindi.`, {nzDuration: 5000}
          );
      } else {
        this.message.error(
          `Something went wrong`, {nzDuration: 5000})
      }
    });
  }
}
