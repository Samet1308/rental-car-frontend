import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCarComponent } from './get-car.component';

describe('GetCarComponent', () => {
  let component: GetCarComponent;
  let fixture: ComponentFixture<GetCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetCarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
