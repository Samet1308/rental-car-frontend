import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NgForOf} from "@angular/common";
import {Model} from "../../../../classes/model";
import {AdminServiceService} from "../../services/admin-service.service";
import {ActivatedRoute} from "@angular/router";
import {Brand} from "../../../../classes/brand";

@Component({
  selector: 'app-search-car',
  standalone: true,
  imports: [
    NzFormModule,
    NzSelectModule,
    NzSpinModule,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './search-car.component.html',
  styleUrls: ['./search-car.component.css']
})
export class SearchCarComponent {
  brandId: number = this.activatedroute.snapshot.params['brandId']
  searchCarForm! : FormGroup
  listOfOption: Array<{label:string; value:string}> = []
  listOfModel: Model[] = [];
  listOfBrand: Brand[] = [];
  listOfTypes =["Benzin","Dizel","Elektrik","Benzin + LPG"]
  listOfColor = ["Kırmızı","Beyaz","Mavi","Siyah","Turuncu","Gri"]
  listOfTransmission = ["Manuel","Otomatik"]
  isSpinning: false;


  constructor(private formBuilder: FormBuilder,
              private adminService: AdminServiceService,
              private activatedroute: ActivatedRoute,) {
      this.searchCarForm = this.formBuilder.group({
        brand: [null],
        model: [null],
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
      console.log(this.searchCarForm.value)
  }
}
