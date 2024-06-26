import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NgForOf} from "@angular/common";
import {Model} from "../../../../classes/model";
import {AdminServiceService} from "../../services/admin-service.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Brand} from "../../../../classes/brand";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzTransitionPatchModule} from "ng-zorro-antd/core/transition-patch/transition-patch.module";
import {NzWaveModule} from "ng-zorro-antd/core/wave";

@Component({
  selector: 'app-search-car',
  standalone: true,
  imports: [
    NzFormModule,
    NzSelectModule,
    NzSpinModule,
    ReactiveFormsModule,
    NgForOf,
    NzButtonModule,
    NzCardModule,
    NzWaveModule,
    RouterLink
  ],
  templateUrl: './search-car.component.html',
  styleUrls: ['./search-car.component.css']
})
export class SearchCarComponent {
  brandId: number = this.activatedroute.snapshot.params['brandId']
  searchCarForm! : FormGroup
  listOfOption: Array<{label:string; value:string}> = []
  cars:any=[]
  listOfModel: Model[] = [];
  listOfBrand: Brand[] = [];
  listOfTypes =["Benzin","Dizel","Elektrik","Benzin + LPG"]
  listOfColor = ["Kırmızı","Beyaz","Mavi","Siyah","Turuncu","Gri"]
  listOfTransmission = ["Manuel","Otomatik"]
  isSpinning = false;


  constructor(private formBuilder: FormBuilder,
              private adminService: AdminServiceService,
              private activatedroute: ActivatedRoute,) {
      this.searchCarForm = this.formBuilder.group({
        type: [null],
        transmission: [null],
        color: [null],
      })
  }
  ngOnInit(): void {
    this.adminService.getAllModels().subscribe(models => {
      this.listOfModel = models;
    });
    this.adminService.getAllBrands().subscribe(brands => {
      this.listOfBrand = brands;
    });
  }
  searchCar(){
    this.isSpinning = true
      console.log(this.searchCarForm.value)
    this.adminService.searchCar(this.searchCarForm.value).subscribe((res)=>{
      console.log(res)
      res.carDTOList.forEach(element =>{
        element.processedImg='data:image/jpeg;base64,'+ element.returnedImage;
        this.cars.push(element)
      })
      this.isSpinning=false
    })

  }
  brandChanged(brandId: number): void {
    this.adminService.getModelsByBrand(brandId).subscribe(models => {
      this.listOfModel = models;
      this.searchCarForm.controls['model'].setValue(null); // Model seçim kutusunu sıfırlayın
    });
  }
}
