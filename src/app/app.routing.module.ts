import { NgModel } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { EmployeeViewComponent } from "./employee-view/employee-view.component";
import { NgModule } from "@angular/core";
import { LoginFormComponent } from "./login-form/login-form.component";
import { AccountRegistrationFormComponent } from "./account-registration-form/account-registration-form.component";

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