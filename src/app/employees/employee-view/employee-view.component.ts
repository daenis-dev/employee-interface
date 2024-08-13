import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../services/employee.service';
import { JobTitleService } from '../services/job-title.service';
import { CompanyService } from '../services/company.service';
import { JobTitle } from '../models/job-title';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Company } from '../models/company';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit{
  editMode = false;
  editedRow: any = null;
  originalRow: any = null;
  jobTitles: string[] = [];
  companies: string[] = [];

  displayedColumns: string[] = ['firstName', 'lastName', 'emailAddress', 'jobTitle', 'company', 'salary', 'actions'];

  dataSource = new MatTableDataSource<any>();

  constructor(private employeeService: EmployeeService, private jobTitleService: JobTitleService, private companyService: CompanyService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.findAllJobTitles();
    this.findAllCompanies();
    this.dataSource = this.employeeService.findAllEmployees();
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

  private findAllCompanies() {
    this.companyService.findAllCompanies()
    .subscribe({
      next: (response: Company[]) => {
        this.companies = response.map(company => company.name!);
      },
      error: () => {
        this.showErrorMessage('Error occurred while retrieving companies');
      }
    });
  }

  edit(row: any) {
    this.editMode = true;
    this.editedRow = row;
    this.originalRow = {...row};
  }

  save(row: any) {
    this.employeeService.updateEmployee(row);
    this.editMode = false;
  }

  cancel() {
    Object.assign(this.editedRow, this.originalRow);
    this.editMode = false;
  }

  delete(row: any) {
    this.employeeService.deleteEmployeeById(row.id);
    this.editedRow = row;
    const filteredData = this.dataSource.data.filter(employee => employee.id !== row.id);
    this.dataSource = new MatTableDataSource<any>(filteredData);
  }

  private showErrorMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['mat-snackbar-error']
    });
  }
}
