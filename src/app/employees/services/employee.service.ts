import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../models/employee';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private router: Router) { }

  findAllEmployees(): MatTableDataSource<any> {
    // TODO: retreive all employees as Employee[]
    return new MatTableDataSource<any>([
      {id: 1, firstName: 'Jim', lastName: 'Halbern', emailAddress: 'jim.halbern@dundermifflin.com', jobTitle: 'Sales', company: 'Company A', salary: '$95,000.00'},
      {id: 2, firstName: 'Dwight', lastName: 'Snoot', emailAddress: 'dwight.snoot@dundermifflin.com', jobTitle: 'Sales', company: 'Company B', salary: '$80,000.00'}
    ]);
  }

  createEmployee(employee: Employee) {
    // TODO: create employee
    
  }

  updateEmployee(employee: Employee) {
    // TODO: Update employee with ID
  }

  deleteEmployeeById(id: number) {
    // TODO: Delete employee by ID
  }
}
