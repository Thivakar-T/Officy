import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthenticationService } from './../../core/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DashboardService } from './../dashboard.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmployeeServiceService } from './../employee-service.service';
declare let $: any;

const URL = 'https://your-url.com';

@Component({
  selector: 'app-employee-request',
  templateUrl: './employee-request.component.html',
  styleUrls: ['./employee-request.component.scss']
})
export class EmployeeRequestComponent implements OnInit {
  employeeReqArr: any = [];
  employeeRejArr: any = [];
  obj: any = {}
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private employeeServiceService: EmployeeServiceService,
    private dashboardService: DashboardService,
    private modalService: NgbModal,
    private User: AuthenticationService,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getBatchList()
    // this.reject(id,data)
  }
  getBatchList() {
    $('#empRequestlist').DataTable().clear().destroy();
    this.employeeServiceService.requeststatus().pipe(first()).subscribe(res => {
      console.log(res)
      this.employeeReqArr = res.data;
      console.log(this.employeeReqArr)
      $(document).ready(function () {
        $('#empRequestlist').DataTable({
          "iDisplayLength": 30,
          "lengthMenu": [10, 25, 30, 50, 100]
        });
      });
      this.spinner.hide();
    }, err => {
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
      }
      this.spinner.hide();
    })
  }
  reject(id: any) {
    console.log(id)
    let reqParams = {
      "id": id,
      "requestStatus": "REJECT"
    }
    this.employeeServiceService.updateEmployee(reqParams).pipe(first()).subscribe(res => {
      this.employeeRejArr = res;
      console.log(res)
      this.getBatchList();
      this.spinner.hide();
    }, err => {
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
      }
      this.spinner.hide();
    })
  }
  // accept(id: any) {
  //   let subject;
  //   this.router.navigate(['/employee/registration',id,subject]); 
  // }
}
