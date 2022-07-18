import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesPaymentPageComponent } from './fees-payment-page.component';

describe('FeesPaymentPageComponent', () => {
  let component: FeesPaymentPageComponent;
  let fixture: ComponentFixture<FeesPaymentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeesPaymentPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeesPaymentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
