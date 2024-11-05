import { TestBed } from '@angular/core/testing';

import { EmployeeService } from './employee.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Employee } from '../models/employee';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;
  let authService: jasmine.SpyObj<AuthService>;
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getToken']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        EmployeeService,
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });

    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should find all employees', () => {
    const mockEmployees = [{ id: 1, firstName: 'John', lastName: 'Doe' }];

    authService.getToken.and.returnValue('mock-token');

    service.findAllEmployees().subscribe((data) => {
      expect(data.data).toEqual(mockEmployees);
    });

    const req = httpMock.expectOne('https://localhost:8080/v1/employees');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('mock-token');

    req.flush(mockEmployees);
  });

  it('should handle error when finding employees', () => {
    authService.getToken.and.returnValue('mock-token');

    service.findAllEmployees().subscribe({
      next: () => fail('expected an error, not employees'),
      error: (error) => {
        expect(error.status).toBe(500);
      }
    });

    const req = httpMock.expectOne('https://localhost:8080/v1/employees');
    req.flush('Error occurred', { status: 500, statusText: 'Server Error' });
  });

  it('should create an employee', () => {
    const newEmployee: Employee = {
      id: 1,
      firstName: 'Jane',
      lastName: 'Doe',
      emailAddress: 'jane.doe@example.com',
      jobTitle: 'Developer',
      salary: '60000'
    };

    authService.getToken.and.returnValue('mock-token');

    service.createEmployee(newEmployee).subscribe((employee) => {
      expect(employee).toEqual(newEmployee);
    });

    const req = httpMock.expectOne('https://localhost:8080/v1/employees');
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe('mock-token');
    
    req.flush(newEmployee);
  });

  it('should update an employee', () => {
    const updatedEmployee: Employee = {
      id: 1,
      firstName: 'Jane',
      lastName: 'Doe',
      emailAddress: 'jane.doe@example.com',
      jobTitle: 'Senior Developer',
      salary: '70000'
    };

    authService.getToken.and.returnValue('mock-token');

    service.updateEmployee(updatedEmployee).subscribe((employee) => {
      expect(employee).toEqual(updatedEmployee);
    });

    const req = httpMock.expectOne(`https://localhost:8080/v1/employees/${updatedEmployee.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toBe('mock-token');
    
    req.flush(updatedEmployee);
  });

  it('should delete an employee', () => {
    const employeeId = 1;

    authService.getToken.and.returnValue('mock-token');

    service.deleteEmployeeById(employeeId).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`https://localhost:8080/v1/employees/${employeeId}`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe('mock-token');
    
    req.flush(null);
  });

  it('should handle error when creating an employee', () => {
    const newEmployee: Employee = { id: 1, firstName: 'Jane', lastName: 'Doe', emailAddress: '', jobTitle: '', salary: '' };
    authService.getToken.and.returnValue('mock-token');

    service.createEmployee(newEmployee).subscribe({
      next: () => fail('expected an error, not employee'),
      error: (error) => {
        expect(error.status).toBe(500);
      }
    });

    const req = httpMock.expectOne('https://localhost:8080/v1/employees');
    req.flush('Error occurred', { status: 500, statusText: 'Server Error' });
  });

  it('should handle error when updating an employee', () => {
    const updatedEmployee: Employee = { id: 1, firstName: 'Jane', lastName: 'Doe', emailAddress: '', jobTitle: '', salary: '' };
    authService.getToken.and.returnValue('mock-token');

    service.updateEmployee(updatedEmployee).subscribe({
      next: () => fail('expected an error, not employee'),
      error: (error) => {
        expect(error.status).toBe(500);
      }
    });

    const req = httpMock.expectOne(`https://localhost:8080/v1/employees/${updatedEmployee.id}`);
    req.flush('Error occurred', { status: 500, statusText: 'Server Error' });
  });

  it('should handle error when deleting an employee', () => {
    const employeeId = 1;
    authService.getToken.and.returnValue('mock-token');

    service.deleteEmployeeById(employeeId).subscribe({
      next: () => fail('expected an error, not a deletion'),
      error: (error) => {
        expect(error.status).toBe(500);
      }
    });

    const req = httpMock.expectOne(`https://localhost:8080/v1/employees/${employeeId}`);
    req.flush('Error occurred', { status: 500, statusText: 'Server Error' });
  });
});

