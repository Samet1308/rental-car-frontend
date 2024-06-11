import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Model} from "../../../../classes/model";
import {Brand} from "../../../../classes/brand";
import {AdminServiceService} from "../../../admin/services/admin-service.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NzTransitionPatchModule} from "ng-zorro-antd/core/transition-patch/transition-patch.module";
import {NzWaveModule} from "ng-zorro-antd/core/wave";
import {CustomerService} from "../../services/customer.service";

@Component({
  selector: 'app-search-car-customer',
  standalone: true,
  imports: [
    NgForOf,
    NzButtonModule,
    NzCardModule,
    NzFormModule,
    NzGridModule,
    NzSelectModule,
    NzSpinModule,
    NzWaveModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './search-car-customer.component.html',
  styleUrls: ['./search-car-customer.component.css']
})
export class SearchCarCustomerComponent {

  brandId: number = this.activatedroute.snapshot.params['brandId']
  searchCarForm! : FormGroup
  listOfOption: Array<{label:string; value:string}> = []
  cars:any=[]
  listOfModel: Model[] = [];
  listOfBrand: Brand[] = [];
  listOfTypes =["Benzin","Dizel","Elektrik","Benzin + LPG"]
  listOfModelYear =["2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024",]
  listOfColor = ["Kırmızı","Beyaz","Mavi","Siyah","Turuncu","Gri"]
  listOfTransmission = ["Manuel","Otomatik"]
  isSpinning = false;


  constructor(private formBuilder: FormBuilder,
              private customerService: CustomerService,
              private activatedroute: ActivatedRoute,) {
    this.searchCarForm = this.formBuilder.group({
      modelYear: [null],
      type: [null],
      transmission: [null],
      color: [null],
    })
  }
  ngOnInit(): void {
    this.customerService.getAllModels().subscribe(models => {
      this.listOfModel = models;
    });
    this.customerService.getAllBrands().subscribe(brands => {
      this.listOfBrand = brands;
    });
  }
  searchCar(){
    this.isSpinning = true
    console.log(this.searchCarForm.value)
    this.customerService.searchCar(this.searchCarForm.value).subscribe((res)=>{
      console.log(res)
      res.carDTOList.forEach(element =>{
        element.processedImg='data:image/jpeg;base64,'+ element.returnedImage;
        this.cars.push(element)
      })
      this.isSpinning=false
    })
  }

}
