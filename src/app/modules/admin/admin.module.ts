import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { PostCarComponent } from './components/post-car/post-car.component';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NzWaveModule} from "ng-zorro-antd/core/wave";
import {ReactiveFormsModule} from "@angular/forms";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";


@NgModule({
  declarations: [
    AdminDashboardComponent,
    PostCarComponent
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        NzButtonModule,
        NzFormModule,
        NzGridModule,
        NzInputModule,
        NzSpinModule,
        NzWaveModule,
        ReactiveFormsModule,
        NzSelectModule,
        NzDatePickerModule
    ]
})
export class AdminModule { }
