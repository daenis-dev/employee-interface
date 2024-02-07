export class Employee {
    id: number;
    firstName: string;
    lastName: string;
    emailAddress: string;
    jobTitle: string;
    salary: string;

    constructor(id: number, firstName: string, lastName: string, emailAddress: string, jobTitle: string, salary: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.jobTitle = jobTitle;
        this.salary = salary;
    }
}