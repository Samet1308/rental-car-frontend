import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGetBookingsComponent } from './admin-get-bookings.component';

describe('AdminGetBookingsComponent', () => {
  let component: AdminGetBookingsComponent;
  let fixture: ComponentFixture<AdminGetBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminGetBookingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminGetBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
