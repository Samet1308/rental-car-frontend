import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminDashboardComponent} from "./components/admin-dashboard/admin-dashboard.component";
import {PostCarComponent} from "./components/post-car/post-car.component";
import {PostBrandComponent} from "./components/post-brand/post-brand.component";
import {PostModelComponent} from "./components/post-model/post-model.component";
import {GetModelComponent} from "./components/get-model/get-model.component";
import {GetCarComponent} from "./components/get-car/get-car.component";
import {UpdateCarComponent} from "./components/update-car/update-car.component";
import {AdminGetBookingsComponent} from "./components/admin-get-bookings/admin-get-bookings.component";

const routes: Routes = [
  {path:"dashboard", component: AdminDashboardComponent},
  {path:"add-brand", component: PostBrandComponent},
  {path: ":brandId/model", component:PostModelComponent},
  {path: ":brandId/models", component:GetModelComponent},
  {path: ":modelId/car", component:PostCarComponent},
  {path: ":modelId/cars", component:GetCarComponent},
  {path: "car/:carId", component:UpdateCarComponent},
  {path: "bookings", component:AdminGetBookingsComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
