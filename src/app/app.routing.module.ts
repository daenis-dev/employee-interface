import { NgModel } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { EmployeeViewComponent } from "./employee-view/employee-view.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    { path: '', component: EmployeeViewComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
    exports: [RouterModule]
})
export class AppRoutingModule {}