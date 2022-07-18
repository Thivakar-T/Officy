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
  selector: 'app-employee-reject',
  templateUrl: './employee-reject.component.html',
  styleUrls: ['./employee-reject.component.scss']
})
export class EmployeeRejectComponent implements OnInit {
  employeeReqArr: any = [];
  rejList: any = {};
  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private employeeServiceService: EmployeeServiceService,
    private dashboardService: DashboardService,
    private modalService: NgbModal,
    private User: AuthenticationService,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getBatchList()
  }
  getBatchList() {
    $('#empRejectlist').DataTable().clear().destroy();
    this.employeeServiceService.rejectstatus().pipe(first()).subscribe(res => {
      console.log(res)
      this.employeeReqArr = res.data;
      console.log(this.employeeReqArr)
      $(document).ready(function () {
        $('#empRejectlist').DataTable({
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
  open(id:any,content: any) {
    this.employeeServiceService.rejecList(id).pipe(first()).subscribe(res => {
      console.log(res)
      this.rejList = res.data;
      console.log(this.rejList)
      console.log(this.rejList.name)
      this.spinner.hide();
    }, err => {
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
      }
      this.spinner.hide();
    })
    this.modalService.open(content, { size: 'xl' });
  }

}
