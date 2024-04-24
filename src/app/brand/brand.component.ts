import {Component, OnInit} from '@angular/core';
import {Brand} from "./brand";
import {BrandService} from "../services/brand.service";

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
  providers: [BrandService]
})
export class BrandComponent implements OnInit{

  brands: any
  selectedBrandIndex: number ;

  selectBrand(index: number): void {
    this.selectedBrandIndex = index;
  }
    constructor(
      private brandService : BrandService
    ) {}

    title= "Markalar"


  ngOnInit():void{
    this.brandService.getBrands().subscribe(response =>{
      console.log(response)
      this.brands = response
    })
  }

}
