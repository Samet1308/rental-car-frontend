import { Component } from '@angular/core';
import {CustomerService} from "../../services/customer.service";
import {DatePipe, NgForOf, NgStyle} from "@angular/common";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NzTableModule} from "ng-zorro-antd/table";

@Component({
  selector: 'app-get-bookings',
  standalone: true,
  imports: [
    DatePipe,
    NzSpinModule,
    NzTableModule,
    NgStyle,
    NgForOf
  ],
  templateUrl: './get-bookings.component.html',
  styleUrls: ['./get-bookings.component.css']
})
export class GetBookingsComponent {

  bookings : any
  isSpinning = false

  constructor(
    private customerService: CustomerService) {
    this.getBookings()
  }

  getBookings(){
    this.isSpinning = true
    this.customerService.getBookingsByUserId().subscribe((res)=> {
      this.isSpinning = false
      this.bookings = res
    })
  }

}
