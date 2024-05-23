import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzWaveModule} from "ng-zorro-antd/core/wave";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CustomerDashboardComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    NzButtonModule,
    NzFormModule,
    NzGridModule,
    NzInputModule,
    NzWaveModule,
    ReactiveFormsModule
  ]
})
export class CustomerModule { }
