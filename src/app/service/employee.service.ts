import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private router: Router) { }

  findAllEmployees(): Employee[] {
    // TODO: retreive all employees
    return [];
  }

  createEmployee(employee: Employee) {
    // TODO: create employee
    
  }
}
