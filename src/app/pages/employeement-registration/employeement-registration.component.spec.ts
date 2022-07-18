import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeementRegistrationComponent } from './employeement-registration.component';

describe('EmployeementRegistrationComponent', () => {
  let component: EmployeementRegistrationComponent;
  let fixture: ComponentFixture<EmployeementRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeementRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeementRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
