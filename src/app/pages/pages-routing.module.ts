import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeementRegistrationComponent } from './employeement-registration/employeement-registration.component';
import { EmployeeRequestComponent } from './employee-request/employee-request.component';
import { EmployeeRejectComponent } from './employee-reject/employee-reject.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AssignProjectPageComponent } from './assign-project-page/assign-project-page.component';
import { FeesPaymentPageComponent } from './fees-payment-page/fees-payment-page.component';
import { SuperAdminSettingComponent } from './super-admin-setting/super-admin-setting.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'employee/registration', component: EmployeementRegistrationComponent },
  { path: 'employee/registration/:id', component: EmployeementRegistrationComponent },
  { path: 'employee/request', component: EmployeeRequestComponent },
  { path: 'employee/reject', component: EmployeeRejectComponent },
  { path: 'attendance', component: AttendanceComponent },
  { path: 'admin', component: AdminPageComponent },
  { path: 'assign/project', component: AssignProjectPageComponent },
  { path: 'fees/payment', component: FeesPaymentPageComponent },
  { path: 'super-admin-setting', component: SuperAdminSettingComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
