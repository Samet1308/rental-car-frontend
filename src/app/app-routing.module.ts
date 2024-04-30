import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CarComponent} from "./components/car/car.component";


const routes: Routes = [
  {path:'cars', component : CarComponent},
  {path:'' , redirectTo: 'cars' , pathMatch:'full'},
  {path:'cars/brands/:brandId', component:CarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
