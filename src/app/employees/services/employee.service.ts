import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../models/employee';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private router: Router, private http: HttpClient, private authService: AuthService) { }

  findAllEmployees(): Observable<MatTableDataSource<any>> {
    return this.http.get<any[]>('https://localhost:8080/v1/employees', { headers: new HttpHeaders({'Authorization': this.authService.getToken()})}).pipe(map(data => new MatTableDataSource(data)));
  }

  createEmployee(employee: Employee): Observable<Employee> {
    const formData: FormData = new FormData();
    formData.append('first-name', employee.firstName ? employee.firstName : '');
    formData.append('last-name', employee.lastName ? employee.lastName : '');
    formData.append('email-address', employee.emailAddress ? employee.emailAddress : '');
    formData.append('job-title', employee.jobTitle ? employee.jobTitle : '');
    formData.append('salary', employee.salary ? employee.salary : '');
    return this.http.post<Employee>(`https://localhost:8080/v1/employees`, formData, { headers: new HttpHeaders({'Authorization': this.authService.getToken()})});
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    const formData: FormData = new FormData();
    formData.append('first-name', employee.firstName ? employee.firstName : '');
    formData.append('last-name', employee.lastName ? employee.lastName : '');
    formData.append('email-address', employee.emailAddress ? employee.emailAddress : '');
    formData.append('job-title', employee.jobTitle ? employee.jobTitle : '');
    formData.append('salary', employee.salary ? employee.salary : '');
    return this.http.put<Employee>(`https://localhost:8080/v1/employees/${employee.id}`, formData, { headers: new HttpHeaders({'Authorization': this.authService.getToken()})});
  }

  deleteEmployeeById(id: number): Observable<any> {
    return this.http.delete<Employee>(`https://localhost:8080/v1/employees/${id}`, { headers: new HttpHeaders({'Authorization': this.authService.getToken()})});
  }
}
