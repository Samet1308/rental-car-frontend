import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCarCustomerComponent } from './get-car-customer.component';

describe('GetCarCustomerComponent', () => {
  let component: GetCarCustomerComponent;
  let fixture: ComponentFixture<GetCarCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetCarCustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetCarCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
