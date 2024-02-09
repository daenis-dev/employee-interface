import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeFormButtonComponent } from './employee-form-button.component';

describe('EmployeeFormButtonComponent', () => {
  let component: EmployeeFormButtonComponent;
  let fixture: ComponentFixture<EmployeeFormButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeFormButtonComponent]
    });
    fixture = TestBed.createComponent(EmployeeFormButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
