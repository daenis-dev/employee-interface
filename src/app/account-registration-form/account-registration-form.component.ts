import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../http/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-registration-form',
  templateUrl: './account-registration-form.component.html',
  styleUrls: ['./account-registration-form.component.css']
})
export class AccountRegistrationFormComponent {

  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar, private router: Router) {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      confirmedPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      let httpParams = new HttpParams()
      .set('first-name', this.registrationForm.value.firstName)
      .set('last-name', this.registrationForm.value.lastName)
      .set('email-address', this.registrationForm.value.email)
      .set('password', this.registrationForm.value.password)
      .set('confirmed-password', this.registrationForm.value.confirmedPassword);

      this.authService.registerAccountForParams(httpParams);
    }
  }

  navigateToLoginForm() {
    this.router.navigateByUrl('login');
  }
}
