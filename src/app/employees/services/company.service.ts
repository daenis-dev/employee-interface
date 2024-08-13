import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  findAllCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>('https://localhost:8080/v1/companies', { headers: new HttpHeaders({'Authorization': 'xyz'})}) // TODO: Include token
  }
}
