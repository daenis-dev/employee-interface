import { TestBed } from '@angular/core/testing';

import { JobTitleService } from './job-title.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from 'src/app/auth/auth.service';
import { JobTitle } from '../models/job-title';

describe('JobTitleService', () => {
  let service: JobTitleService;
  let httpMock: HttpTestingController;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getToken']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        JobTitleService,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });

    service = TestBed.inject(JobTitleService);
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should find all job titles', () => {
    const mockJobTitles: JobTitle[] = [
      { id: 1, name: 'Software Engineer' },
      { id: 2, name: 'Project Manager' }
    ];

    authService.getToken.and.returnValue('mock-token');

    service.findAllJobTitles().subscribe((jobTitles) => {
      expect(jobTitles).toEqual(mockJobTitles);
    });

    const req = httpMock.expectOne('https://localhost:8080/v1/job-titles');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('mock-token');

    req.flush(mockJobTitles);
  });

  it('should handle error when finding job titles', () => {
    authService.getToken.and.returnValue('mock-token');

    service.findAllJobTitles().subscribe({
      next: () => fail('expected an error, not job titles'),
      error: (error) => {
        expect(error.status).toBe(500);
      }
    });

    const req = httpMock.expectOne('https://localhost:8080/v1/job-titles');
    req.flush('Error occurred', { status: 500, statusText: 'Server Error' });
  });
});

