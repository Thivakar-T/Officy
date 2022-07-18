import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignProjectPageComponent } from './assign-project-page.component';

describe('AssignProjectPageComponent', () => {
  let component: AssignProjectPageComponent;
  let fixture: ComponentFixture<AssignProjectPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignProjectPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignProjectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
