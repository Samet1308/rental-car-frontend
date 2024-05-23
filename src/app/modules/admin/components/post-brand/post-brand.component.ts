import { Component } from '@angular/core';
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NzFormModule} from "ng-zorro-antd/form";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AdminServiceService} from "../../services/admin-service.service";
import {NgIf} from "@angular/common";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post-brand',
  standalone: true,
  imports: [
    NzSpinModule,
    NzFormModule,
    NgIf,
    NzInputModule,
    NzButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './post-brand.component.html',
  styleUrls: ['./post-brand.component.css']
})
export class PostBrandComponent {
  postBrandForm : FormGroup
  isSpinning = false
  selectedFile : File | null
  imagePreview: string|ArrayBuffer|null

  constructor(
    private adminService:AdminServiceService,
    private formBuilder: FormBuilder,
    private message: NzMessageService,
    private router : Router) {
  }

  ngOnInit(){
    this.postBrandForm = this.formBuilder.group(
      {
        name:[null,Validators.required]
      }
    )
  }

  postBrand(){
    console.log(this.postBrandForm.value)
    const formData : FormData=new FormData()
    formData.append("image",this.selectedFile)
    formData.append("name",this.postBrandForm.get("name").value)
    this.adminService.postBrand(formData).subscribe(
      (res)=>{
        this.message.success("Marka eklendi", {nzDuration:5000})
        this.router.navigateByUrl("/admin/dashboard")
        console.log(res)
      }
    )
  }
  onFileSelected(event:any){
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.previewImage();
    } else {
      // Dosya seçilmediğinde yapılacak işlemler buraya gelebilir
      console.error("Dosya seçilmedi.");
    }
  }
  previewImage(){
    const reader = new FileReader()
    reader.onload=() =>{
      this.imagePreview =reader.result
    }
    // @ts-ignore
    reader.readAsDataURL(this.selectedFile)
  }
}
