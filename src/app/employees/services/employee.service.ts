import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../models/employee';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private router: Router, private http: HttpClient) { }

  findAllEmployees(): Observable<MatTableDataSource<any>> {
    return this.http.get<any[]>('https://localhost:8080/v1/employees').pipe(map(data => new MatTableDataSource(data)));
  }

  createEmployee(employee: Employee): Observable<Employee> {
    const formData: FormData = new FormData();
    formData.append('first-name', employee.firstName ? employee.firstName : '');
    formData.append('last-name', employee.lastName ? employee.lastName : '');
    formData.append('email-address', employee.emailAddress ? employee.emailAddress : '');
    formData.append('job-title', employee.jobTitle ? employee.jobTitle : '');
    formData.append('salary', employee.salary ? employee.salary : '');
    return this.http.post<Employee>(`https://localhost:8080/v1/employees`, formData);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    const formData: FormData = new FormData();
    formData.append('first-name', employee.firstName ? employee.firstName : '');
    formData.append('last-name', employee.lastName ? employee.lastName : '');
    formData.append('email-address', employee.emailAddress ? employee.emailAddress : '');
    formData.append('job-title', employee.jobTitle ? employee.jobTitle : '');
    formData.append('salary', employee.salary ? employee.salary : '');
    return this.http.put<Employee>(`https://localhost:8080/v1/employees/${employee.id}`, formData);
  }

  deleteEmployeeById(id: number): Observable<any> {
    return this.http.delete<Employee>(`https://localhost:8080/v1/employees/${id}`);
  }
}
