import { Component } from '@angular/core';
import {AdminServiceService} from "../../services/admin-service.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NzWaveModule} from "ng-zorro-antd/core/wave";

@Component({
  selector: 'app-update-car',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NzButtonModule,
    NzFormModule,
    NzGridModule,
    NzInputModule,
    NzSelectModule,
    NzSpinModule,
    NzWaveModule,
    ReactiveFormsModule
  ],
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.css']
})
export class UpdateCarComponent {

  carId:number= this.activatedRoute.snapshot.params["carId"];
  existingImage : string | null = null
  updateForm!: FormGroup
  isSpinning: boolean = false
  imgChanged : boolean =false
  selectedFile : any
  imagePreview: string | ArrayBuffer | null
  listOfOption: Array<{label:string; value:string}> = []
  listOfTypes =["Benzin","Dizel","Elektrik","Benzin + LPG"]
  listOfColor = ["Kırmızı","Beyaz","Mavi","Siyah","Turuncu","Gri"]
  listOfTransmission = ["Manuel","Otomatik"]

  constructor(
    private activatedRoute: ActivatedRoute,
    private adminService : AdminServiceService,
    private formBuilder:FormBuilder,
    private message:NzMessageService,
    private router : Router
  ) {}

  ngOnInit(){
    this.updateForm=this.formBuilder.group({
      name:[null,Validators.required],
      color:[null,Validators.required],
      type:[null,Validators.required],
      transmission:[null,Validators.required],
      dailyPrice:[null,Validators.required],
      modelYear:[null,Validators.required],
    })
    this.getCarById()
  }

  getCarById(){
    this.isSpinning = true
    this.adminService.getCarsById(this.carId).subscribe((res)=>{
      this.isSpinning = false
      const carDto = res
      this.existingImage = 'data:image/jpeg;base64,'+ res.returnedImage;
      console.log(carDto)
      console.log(this.existingImage)
      this.updateForm.patchValue(carDto)
    })
  }

  updateCar(){
    console.log(this.updateForm.value)
    this.isSpinning = true;
    const formData: FormData = new FormData();
    if(this.imgChanged && this.selectedFile){
      formData.append('image',this.selectedFile)
    }

    formData.append('name',this.updateForm.get('name').value)
    formData.append('color',this.updateForm.get('color').value)
    formData.append('type',this.updateForm.get('type').value)
    formData.append('transmission',this.updateForm.get('transmission').value)
    formData.append('dailyPrice',this.updateForm.get('dailyPrice').value)
    formData.append('modelYear',this.updateForm.get('modelYear').value)

    this.adminService.updateCar(this.carId, formData).subscribe((res)=>{
      this.isSpinning = false;
      this.message
        .success(
          `Araç Başarıyla Güncellendi.`, {nzDuration: 5000}
        );
      this.router.navigateByUrl('/admin/dashboard');
    });
  }

  onFileSelected (event: any) {
    this.selectedFile = event.target.files[0];
    this.imgChanged = true;
    this.existingImage = null
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
