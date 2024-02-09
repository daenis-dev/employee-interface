import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRegistrationFormComponent } from './account-registration-form.component';

describe('AccountRegistrationFormComponent', () => {
  let component: AccountRegistrationFormComponent;
  let fixture: ComponentFixture<AccountRegistrationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountRegistrationFormComponent]
    });
    fixture = TestBed.createComponent(AccountRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
