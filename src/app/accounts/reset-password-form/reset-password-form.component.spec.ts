import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ResetPasswordFormComponent } from './reset-password-form.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ResetPasswordFormComponent', () => {
  let component: ResetPasswordFormComponent;
  let fixture: ComponentFixture<ResetPasswordFormComponent>;
  let snackBar: MatSnackBar;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordFormComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatDialogModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [
        MatSnackBar,
        MatDialog
      ]
    });
    
    fixture = TestBed.createComponent(ResetPasswordFormComponent);
    component = fixture.componentInstance;
    snackBar = TestBed.inject(MatSnackBar);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a success message on password reset', fakeAsync(() => {
    spyOn(snackBar, 'open');

    component.resetPasswordForm.setValue({
      emailAddress: 'test@example.com'
    });

    component.onSubmit();

    const req = httpTestingController.expectOne('https://localhost:8080/v1/accounts/reset-password');
    expect(req.request.method).toBe('POST');
    req.flush({});

    tick();

    expect(snackBar.open).toHaveBeenCalledWith('Link to reset password has been sent via email', 'Close', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['mat-snackbar-success']
    });

    httpTestingController.verify();
  }));
});

