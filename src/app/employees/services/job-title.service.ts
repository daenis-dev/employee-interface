import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JobTitle } from '../models/job-title';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobTitleService {

  constructor(private http: HttpClient) { }

  findAllJobTitles(): Observable<JobTitle[]> {
    return this.http.get<JobTitle[]>('https://localhost:8080/v1/job-titles', { headers: new HttpHeaders({'Authorization': 'xyz'})}) // TODO: Include token
  }
}
