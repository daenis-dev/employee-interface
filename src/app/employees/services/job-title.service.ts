import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JobTitle } from '../models/job-title';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class JobTitleService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  findAllJobTitles(): Observable<JobTitle[]> {
    return this.http.get<JobTitle[]>('https://localhost:8080/v1/job-titles', { headers: new HttpHeaders({'Authorization': this.authService.getToken()})})
  }
}
