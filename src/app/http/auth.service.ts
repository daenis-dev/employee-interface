import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenKey = 'token';
  tokenExpDateKey = 'token-exp';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  isAuthenticated() {
    let tokenExpirationDate: any = localStorage.getItem(this.tokenExpDateKey);
    return localStorage.getItem(this.tokenKey) != null && new Date(tokenExpirationDate).getDate() > new Date().getDate();
  }

  loginForEmailAndPassword(email: string, password: string) {
    this.http.post("https//localhost:8080/v1/login", null, {params: new HttpParams().set("email", email).set("password", password)})
    .subscribe({
      next: (data) => {
        let response: any = data;
        if (response.accessToken != null && response.accessToken !== 'Bearer null') {
          localStorage.setItem(this.tokenKey, response.accessToken);
          let expDate: any = new Date(new Date().setDate(new Date().getDate() + 1));
          localStorage.setItem(this.tokenExpDateKey, expDate);
          // TODO: Navigate to the employee view (move logic to the component)
        }
      },
      error: () => this.showErrorMessage("Login attempt failed")
    });
  }

  private showErrorMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['mat-snackbar-error']
    });
  }

  logout() {
    localStorage.clear();
    // TODO: Navigate to the login window (move logic to the component)
  }
}
