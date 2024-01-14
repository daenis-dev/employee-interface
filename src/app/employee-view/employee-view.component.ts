import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit{
  editMode = false;
  editedRow: any = null;
  jobTitles: string[] = [];

  displayedColumns: string[] = ['firstName', 'lastName', 'emailAddress', 'jobTitle', 'salary', 'actions'];

  dataSource = new MatTableDataSource<any>([
    {firstName: 'Jim', lastName: 'Halbern', emailAddress: 'jim.halbern@dundermifflin.com', jobTitle: 'Sales', salary: '$95,000.00'},
    {firstName: 'Dwight', lastName: 'Snoot', emailAddress: 'dwight.snoot@dundermifflin.com', jobTitle: 'Sales', salary: '$80,000.00'}
  ]);

  ngOnInit(): void {
    this.jobTitles = ['Sales', 'Accounting', 'Reception'];
  }

    // TODO: submit request to server
  edit(row: any) {
    this.editMode = true;
    this.editedRow = row;
    console.log('Edit: ', JSON.stringify(this.editedRow));
  }

  save() {
    console.log('Saved: ', JSON.stringify(this.editedRow));
    this.editMode = false;
  }

  cancel() {
    this.editMode = false;
    console.log('Canceled');
  }

    // TODO: submit request to server
  delete(row: any) {
    this.editedRow = row;
    console.log('Delete: ', JSON.stringify(this.editedRow));
  }
}
