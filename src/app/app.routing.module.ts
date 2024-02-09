import { NgModel } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { EmployeeViewComponent } from "./employees/employee-view/employee-view.component";
import { NgModule } from "@angular/core";
import { LoginFormComponent } from "./accounts/login-form/login-form.component";
import { AccountRegistrationFormComponent } from "./accounts/account-registration-form/account-registration-form.component";

const routes: Routes = [
    { path: '', component: EmployeeViewComponent },
    { path: 'login', component: LoginFormComponent },
    { path: 'register', component: AccountRegistrationFormComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
    exports: [RouterModule]
})
export class AppRoutingModule {}