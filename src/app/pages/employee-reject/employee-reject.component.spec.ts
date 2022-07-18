import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRejectComponent } from './employee-reject.component';

describe('EmployeeRejectComponent', () => {
  let component: EmployeeRejectComponent;
  let fixture: ComponentFixture<EmployeeRejectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeRejectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
