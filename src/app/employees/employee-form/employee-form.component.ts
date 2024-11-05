import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee';
import { JobTitle } from '../models/job-title';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {
  jobTitles: string[] = [];
  employees: Employee[] = [];
  @Output() employeesChange = new EventEmitter<Employee[]>();
  
  form: FormGroup;
  isSubmitting = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { jobTitles: string[], employees: Employee[] }, private fb: FormBuilder, private employeeService: EmployeeService, private snackBar: MatSnackBar, private dialogRef: MatDialogRef<EmployeeFormComponent>) {
    this.jobTitles = data.jobTitles;
    this.employees = data.employees;
    this.form = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailAddress: ['', Validators.required],
      jobTitle: ['', Validators.required],
      salary: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitting = true;
      const employee = new Employee(0, this.form.get('firstName')?.value, this.form.get('lastName')?.value,
        this.form.get('emailAddress')?.value, this.form.get('jobTitle')?.value, this.form.get('salary')?.value);
      
      this.employeeService.createEmployee(employee).subscribe({
        next: (response: Employee) => {
          this.employees.push(response);
          this.employeesChange.emit(this.employees);
          this.showSuccessMessage('Successfully created the employee');
          this.isSubmitting = false;
          this.isSubmitting = false;
          this.dialogRef.close(this.employees);
        },
        error: () => {
          this.showErrorMessage('Error occurred while creating the employee');
          this.isSubmitting = false;
        }
      });
    }
  }

  private showSuccessMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['mat-snackbar-success']
    });
  }

  private showErrorMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['mat-snackbar-error']
    });
  }
}
