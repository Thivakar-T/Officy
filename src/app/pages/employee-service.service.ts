import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  private _baseUrl = environment.API_URL;
  private empRegister = this._baseUrl + '/api/employee/create';
  private _baseUrl2 = this._baseUrl + '/api/employee/employeeStatusActiveAndInactive';
  private _updateRegistration = this._baseUrl + '/api/employee/update';
  private deletRegistration = this._baseUrl + '/api/employee/delete';
  private getidapiurl = this._baseUrl + '/api/employee/get';
  private reqstatus = this._baseUrl + '/api/requeststatus';
  private rejstatus = this._baseUrl + '/api/rejectedlist';
  private rejList = this._baseUrl + '/api/getemployee';
  private updateEmp = this._baseUrl + '/api/updateemployee';
  private getEmp = this._baseUrl + '/api/getemployee';
  private attendance = this._baseUrl + '/api/employee/checkin'
  private getAtt = this._baseUrl + '/api/employee/attendance'
  private getAttendanceDetailsById = this._baseUrl + '/api/employee/getAttendanceDetailsById'
  private updateAttendances = this._baseUrl + '/api/employee/checkout'
  // fees api
  private feesGet = this._baseUrl + '/api/feespayment/getPaymenthistorylist';
  private fees = this._baseUrl + '/api/feespayment/create';
  private feesGetId = this._baseUrl + '/api/feespayment/get';
  private feesUpdate = this._baseUrl + '/api/feespayment/update';
  //superadminsetting api
  private updateSuperAdminSetting = this._baseUrl + '/api/superadminsetting/update';
  private superadminsetting = this._baseUrl + '/api/superadminsetting/create';
  private getSuperAdminSettingId = this._baseUrl + '/api/superadminsetting/get';
  //project assign api
  private getProjectAssignId = this._baseUrl + '/api/projectAssinged/get';
  private createProjectAssign = this._baseUrl + '/api/projectAssinged/create';
  private getProjectAssign = this._baseUrl + '/api/projectAssinged/getAll';
  private updateProjectAssign = this._baseUrl + '/api/projectAssinged/create';
  //project controller api
  private getProjectId = this._baseUrl + '/api/getproject';
  private createProject = this._baseUrl + '/api/project';
  private getProject = this._baseUrl + '/api/getprojectlist';
  private updateProject = this._baseUrl + '/api/updateproject';
  private deleteProject = this._baseUrl + '/api/delete';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
  empReg(data) {
    return this.http.post<any>(this.empRegister, data);
  }
  get() {
    return this.http.get<any>(this._baseUrl2);
  }
  updateRegistration(data) {
    return this.http.put<any>(this._updateRegistration, data);
  }
  public getidData(id) {
    return this.http.get<any>(this.getidapiurl + '/' + id);
  }
  deleteData(id: any) {
    return this.http.put<any>(this.deletRegistration + '/' + id, id);
  }
  requeststatus() {
    return this.http.get<any>(this.reqstatus);
  }
  rejectstatus() {
    return this.http.get<any>(this.rejstatus);
  }
  public rejecList(id) {
    return this.http.get<any>(this.rejList + '/' + id);
  }
  updateEmployee(data) {
    return this.http.put<any>(this.updateEmp, data);
  }
  public getEmployee(id) {
    return this.http.get<any>(this.getEmp + '/' + id);
  }
  createAttendance(data) {
    return this.http.post<any>(this.attendance, data);
  }
  updateAttendance(data) {
    return this.http.put<any>(this.updateAttendances, data);
  }
  public getAttendance(id) {
    return this.http.get<any>(this.getAtt + '/' + id);
  }
  public getAttendanceDetailsId(id) {
    return this.http.get<any>(this.getAttendanceDetailsById + '/' + id);
  }

  // ** Fees api
  createFeesPayment(data) {
    return this.http.post<any>(this.fees, data);
  }
  getFeesPayment() {
    return this.http.get<any>(this.feesGet);
  }
  public getFeesPaymentId(id) {
    return this.http.get<any>(this.feesGetId + '/' + id);
  }
  updateFeesPayment(data) {
    return this.http.put<any>(this.feesUpdate, data);
  }
  //  Fees api **


  // ** superadminsetting api
  createsuperadminsetting(data) {
    return this.http.post<any>(this.superadminsetting, data);
  }
  public getSuperAdminId(id) {
    return this.http.get<any>(this.getSuperAdminSettingId + '/' + id);
  }
  updateSuperAdmin(data) {
    return this.http.put<any>(this.updateSuperAdminSetting, data);
  }
  //  superadminsetting api **


  // ** Assign project Assign api
  createProjectAssignn(data) {
    return this.http.post<any>(this.createProjectAssign, data);
  }
  getProjectAssignn() {
    return this.http.get<any>(this.getProjectAssign);
  }
  public getProjectAssignnId(id) {
    return this.http.get<any>(this.getProjectAssignId + '/' + id);
  }
  updateProjectAssignn(data) {
    return this.http.put<any>(this.updateProjectAssign, data);
  }
  //  Assign project Assign api **


  // ** Assign project api
  projectCreate(data) {
    return this.http.post<any>(this.createProject, data);
  }
  projectGet() {
    return this.http.get<any>(this.getProject);
  }
  public projectGetId(id) {
    return this.http.get<any>(this.getProjectId + '/' + id);
  }
  projectUpdate(data) {
    return this.http.put<any>(this.updateProject, data);
  }
  projectDelete(id: any) {
    return this.http.put<any>(this.deleteProject + '/' + id, id);
  }
  //  Assign project api **
}
