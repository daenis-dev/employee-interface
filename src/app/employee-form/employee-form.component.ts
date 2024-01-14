import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {
  form: FormGroup;
  jobTitles: string[] = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailAddress: ['', Validators.required],
      jobTitle: ['', Validators.required],
      salary: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.jobTitles = ['Sales', 'Accounting', 'Reception'];
  }

  onSubmit() {
    if (this.form.valid) {
      // TODO: submit request to server
      console.log('Selected first name: ' + this.form.get('firstName')?.value);
      console.log('Selected last name: ' + this.form.get('lastName')?.value);
      console.log('Selected email address: ' + this.form.get('emailAddress')?.value);
      console.log('Selected job title: ' + this.form.get('jobTitle')?.value);
      console.log('Selected salary: ' + this.form.get('salary')?.value);
    }
  }
}
