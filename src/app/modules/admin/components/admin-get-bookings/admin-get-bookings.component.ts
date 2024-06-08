import { Component } from '@angular/core';
import {CustomerService} from "../../../customer/services/customer.service";
import {AdminServiceService} from "../../services/admin-service.service";
import {DatePipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-admin-get-bookings',
  standalone: true,
  imports: [
    DatePipe,
    NzSpinModule,
    NzTableModule,
    NgStyle,
    NzButtonModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './admin-get-bookings.component.html',
  styleUrls: ['./admin-get-bookings.component.css']
})
export class AdminGetBookingsComponent {
  bookings : any
  isSpinning = false

  constructor(
    private adminsService: AdminServiceService,
    private message: NzMessageService) {
    this.getBookings()
  }

  getBookings(){
    this.isSpinning = true
    this.adminsService.getBookings().subscribe((res)=> {
      this.isSpinning = false
      this.bookings = res
    })
  }
  changeBookingStatus(bookingId:number , status : string){
    this.isSpinning = true
    console.log(bookingId,status)
    this.adminsService.changeBookingStatus(bookingId,status).subscribe((res)=> {
      this.isSpinning = false
      this.getBookings()
      this.message.success("Araç Kiralama Durumu Güncellendi", {nzDuration:5000})
    },error => {
      this.message.error("Bir Hata Oluştu", {nzDuration:5000})
    })
  }

}
