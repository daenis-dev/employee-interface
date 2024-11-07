import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ResetPasswordFormComponent } from '../reset-password-form/reset-password-form.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  loginForm: FormGroup;

  hidePassword: boolean = true;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private dialog: MatDialog) {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/employees');
    }
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password:['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.loginForEmailAndPassword(this.loginForm?.value?.email, this.loginForm?.value?.password);
    }
  }

  navigateToRegistrationForm() {
    this.router.navigateByUrl('/register');
  }

  displayResetPasswordForm() {
    this.dialog.open(ResetPasswordFormComponent, {
      width: '600px',
      height: '300px'
    });
  }
}
