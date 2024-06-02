import { Component } from '@angular/core';
import {CustomerService} from "../../../customer/services/customer.service";
import {AdminServiceService} from "../../services/admin-service.service";
import {DatePipe, NgForOf, NgStyle} from "@angular/common";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzButtonModule} from "ng-zorro-antd/button";

@Component({
  selector: 'app-admin-get-bookings',
  standalone: true,
  imports: [
    DatePipe,
    NzSpinModule,
    NzTableModule,
    NgStyle,
    NzButtonModule,
    NgForOf
  ],
  templateUrl: './admin-get-bookings.component.html',
  styleUrls: ['./admin-get-bookings.component.css']
})
export class AdminGetBookingsComponent {
  bookings : any
  isSpinning = false

  constructor(
    private adminsService: AdminServiceService) {
    this.getBookings()
  }

  getBookings(){
    this.isSpinning = true
    this.adminsService.getBookings().subscribe((res)=> {
      this.isSpinning = false
      this.bookings = res
    })
  }

}
