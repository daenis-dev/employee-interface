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
