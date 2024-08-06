import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';

@Component({
  selector: 'app-employee-form-button',
  templateUrl: './employee-form-button.component.html',
  styleUrls: ['./employee-form-button.component.css']
})
export class EmployeeFormButtonComponent {

  constructor(private dialog: MatDialog) {}

  openCreateForm(): void {
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      width: '500px', // Set the width of the dialog
    });

    // Handle dialog close and result if needed
    dialogRef.afterClosed().subscribe(result => {
      // Handle dialog result (e.g., form submission)
    });
  }
}
