import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetModelCustomerComponent } from './get-model-customer.component';

describe('GetModelCustomerComponent', () => {
  let component: GetModelCustomerComponent;
  let fixture: ComponentFixture<GetModelCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetModelCustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetModelCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
