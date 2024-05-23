import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerDashboardComponent} from "./components/customer-dashboard/customer-dashboard.component";
import {GetModelCustomerComponent} from "./components/get-model-customer/get-model-customer.component";
import {GetCarComponent} from "../admin/components/get-car/get-car.component";
import {GetCarCustomerComponent} from "./components/get-car-customer/get-car-customer.component";

const routes: Routes = [
  {path: "dashboard", component: CustomerDashboardComponent},
  {path: ":brandId/models", component: GetModelCustomerComponent},
  {path: ":modelId/cars", component: GetCarCustomerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
