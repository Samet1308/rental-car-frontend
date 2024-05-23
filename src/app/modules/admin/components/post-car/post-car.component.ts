import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminServiceService} from "../../services/admin-service.service";
import {Observable} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-post-car',
  templateUrl: './post-car.component.html',
  styleUrls: ['./post-car.component.css']
})
export class PostCarComponent {

  modelId: number = this.activatedroute.snapshot.params['modelId']
  postCarForm!: FormGroup
  isSpinning: boolean = false
  selectedFile : File | null
  imagePreview: string | ArrayBuffer | null
  listOfOption: Array<{label:string; value:string}> = []
  listOfTypes =["Benzin","Dizel","Elektrik","Benzin + LPG"]
  listOfColor = ["Kırmızı","Beyaz","Mavi","Siyah","Turuncu","Gri"]
  listOfTransmission = ["Manuel","Otomatik"]

  constructor(
    private formBuilder:FormBuilder,
    private adminService : AdminServiceService,
    private message: NzMessageService,
    private activatedroute: ActivatedRoute,
    private router : Router) {
  }

  ngOnInit(){
    this.postCarForm = this.formBuilder.group({
      name:[null,Validators.required],
      color:[null,Validators.required],
      type:[null,Validators.required],
      transmission:[null,Validators.required],
      dailyPrice:[null,Validators.required],
      modelYear:[null,Validators.required],
    })
  }

  postCar():void{
    console.log(this.postCarForm.value)
    this.isSpinning = true;
    const formData: FormData = new FormData();
    formData.append('image',this.selectedFile)
    formData.append('name',this.postCarForm.get('name').value)
    formData.append('color',this.postCarForm.get('color').value)
    formData.append('type',this.postCarForm.get('type').value)
    formData.append('transmission',this.postCarForm.get('transmission').value)
    formData.append('dailyPrice',this.postCarForm.get('dailyPrice').value)
    formData.append('modelYear',this.postCarForm.get('modelYear').value)

    this.adminService.postCar(this.modelId, formData).subscribe((res)=>{
      this.isSpinning = false;
      if (res.id != null) {
        this.message
          .success(
            `Araç Başarıyla Eklendi.`, {nzDuration: 5000}
          );
        this.router.navigateByUrl('/admin/dashboard');
      } else {
        this.message.error(
          `Something went wrong`, {nzDuration: 5000})
      }
    });
  }


  onFileSelected (event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

}
