import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../services/employee.service';
import { JobTitleService } from '../services/job-title.service';
import { JobTitle } from '../models/job-title';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit {
  isSubmitting = false;

  editMode = false;
  editedRow: any = null;
  originalRow: any = null;
  jobTitles: string[] = [];

  displayedColumns: string[] = ['firstName', 'lastName', 'emailAddress', 'jobTitle', 'salary', 'actions'];

  dataSource = new MatTableDataSource<any>();

  constructor(private employeeService: EmployeeService, private jobTitleService: JobTitleService, private snackBar: MatSnackBar, private http: HttpClient) {}

  ngOnInit(): void {
    this.findAllJobTitles();
    this.findAllEmployees();
  }
  
  private findAllJobTitles() {
    this.jobTitleService.findAllJobTitles()
    .subscribe({
      next: (response: JobTitle[]) => {
        this.jobTitles = response.map(jobTitle => jobTitle.name!);
      },
      error: () => {
        this.showErrorMessage('Error occurred while retrieving job titles');
      }
    });
  }

  private findAllEmployees() {
    this.employeeService.findAllEmployees().subscribe({
      next: (dataSource: MatTableDataSource<any>) => {
        this.dataSource = dataSource;
      },
      error: () => {
        this.showErrorMessage('Error occurred while retrieving employee data');
      }
    });
  }

  edit(row: any) {
    this.editMode = true;
    this.editedRow = row;
    this.originalRow = {...row};
  }

  save(row: any) {
    this.isSubmitting = true;
    this.employeeService.updateEmployee(row).subscribe({
      next: () => {
        this.showSuccessMessage('Successfully updated employee');
        this.editMode = false;
        this.isSubmitting = false;
      },
      error: () => {
        this.showErrorMessage('Error occurred while updating employee');
        this.isSubmitting = false;
      }
    });
  }

  cancel() {
    Object.assign(this.editedRow, this.originalRow);
    this.originalRow = undefined;
    this.editMode = false;
  }

  delete(row: any) {
    this.isSubmitting = true;
    this.employeeService.deleteEmployeeById(row.id).subscribe({
      next: () => {
        this.editedRow = row;
        const filteredData = this.dataSource.data.filter(employee => employee.id !== row.id);
        this.dataSource = new MatTableDataSource<any>(filteredData);
        this.showSuccessMessage('Successfully deleted employee');
        this.isSubmitting = false;
      },
      error: () => {
        this.showErrorMessage('Error occurred while deleting employee');
        this.isSubmitting = false;
      }
    });
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
