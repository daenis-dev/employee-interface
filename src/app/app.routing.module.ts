import { RouterModule, Routes } from "@angular/router";
import { EmployeeViewComponent } from "./employees/employee-view/employee-view.component";
import { NgModule } from "@angular/core";
import { LoginFormComponent } from "./accounts/login-form/login-form.component";
import { AccountRegistrationFormComponent } from "./accounts/account-registration-form/account-registration-form.component";
import { authGuard } from "./auth/permission.service";

const routes: Routes = [
    { path: '', component: LoginFormComponent },
    { path: 'register', component: AccountRegistrationFormComponent },
    { path: 'employees', component: EmployeeViewComponent, canActivate: [authGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
    exports: [RouterModule]
})
export class AppRoutingModule {}