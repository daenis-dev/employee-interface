import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css']
})
export class ResetPasswordFormComponent {
  resetPasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private snackBar: MatSnackBar, public dialog: MatDialog) {
    this.resetPasswordForm = this.fb.group({
      emailAddress: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      let httpParams = new HttpParams()
      .set('email-address', this.resetPasswordForm.value.emailAddress);
      this.http.post('https://localhost:8080/v1/accounts/reset-password', httpParams)
      .subscribe({
        next: () => this.showSuccessMessage("Link to reset password has been sent via email"),
        error: () => this.showErrorMessage("Error occurred while sending the link to reset password via email")
      });
    }
  }

  private showSuccessMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['mat-snackbar-success']
    });
  }

  private showErrorMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['mat-snackbar-error']
    });
  }
}
