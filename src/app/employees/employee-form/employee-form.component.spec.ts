import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeFormComponent } from './employee-form.component';

import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from '../services/employee.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EmployeeFormComponent', () => {
  let component: EmployeeFormComponent;
  let fixture: ComponentFixture<EmployeeFormComponent>;
  let employeeServiceSpy: jasmine.SpyObj<EmployeeService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<EmployeeFormComponent>>;

  beforeEach(() => {
    employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['createEmployee']);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule
      ],
      declarations: [EmployeeFormComponent],
      providers: [
        { provide: EmployeeService, useValue: employeeServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { jobTitles: [], employees: [] } },
        FormBuilder
      ]
    });

    fixture = TestBed.createComponent(EmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with required fields', () => {
    expect(component.form.contains('firstName')).toBeTrue();
    expect(component.form.contains('lastName')).toBeTrue();
    expect(component.form.contains('emailAddress')).toBeTrue();
    expect(component.form.contains('jobTitle')).toBeTrue();
    expect(component.form.contains('salary')).toBeTrue();
  });

  it('should not submit the form if it is invalid', () => {
    component.form.get('firstName')?.setValue('');
    component.onSubmit();

    expect(employeeServiceSpy.createEmployee).not.toHaveBeenCalled();
    expect(component.isSubmitting).toBeFalse();
  });
});


