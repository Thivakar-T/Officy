import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthenticationService } from './../../core/services/auth.service';
import { EmployeeServiceService } from './../employee-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DashboardService } from './../dashboard.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
declare let $: any;
@Component({
  selector: 'app-super-admin-setting',
  templateUrl: './super-admin-setting.component.html',
  styleUrls: ['./super-admin-setting.component.scss']
})
export class SuperAdminSettingComponent implements OnInit {
  configData;
  schemeId: any;
  superAdminObj: any = {};
  superAdminArr: any = [];
  public superAdminForm: FormGroup;
  myDate = new Date();
  superAdminSubmitted = false;
  buttonText: string = "";
  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private dashboardService: DashboardService,
    private modalService: NgbModal,
    private employeeServiceService: EmployeeServiceService,
    public toastr: ToastrService,
    private datePipe: DatePipe,
    public spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.superAdminForm = this.formBuilder.group(
      {
        id: [null],
        name: [null],
        phone: [null],
        logoFileName: [null],
        feesAmount: [null],
      })
    this.configData = {
      suppressScrollX: true,
      wheelSpeed: 0.3
    };
    this.getBatchList();
  }
  getBatchList() {

    $('#superadminlist').DataTable().clear().destroy();
    this.employeeServiceService.projectGet().pipe(first()).subscribe(res => {
      console.log(res)
      this.superAdminArr = res.data;
      console.log(this.superAdminArr)
      $(document).ready(function () {
        $('#superadminlist').DataTable({
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
  openSubject(content: any) {
    this.buttonText = "Submit";
    this.superAdminForm.reset({});
    this.superAdminObj = {};
    this.superAdminSubmitted = false;
    this.modalService.open(content, { size: 'lg' });
  }
  openModal(content: any, schemeId,) {
    if (schemeId) {
      this.schemeId = schemeId;
      this.modalService.open(content, { size: 'md' });
    }
  }
  Submit(modal) {
    this.superAdminSubmitted = true;
    if (this.superAdminForm.invalid) {
      return;
    }

    if (this.superAdminObj.id) {
      console.log(this.superAdminObj.id)
      this.superAdminForm.value.id = this.superAdminObj.id;
      this.employeeServiceService.updateSuperAdmin(this.superAdminForm.value).pipe(first())
        .subscribe(
          res => {
            console.log(res)
            this.getBatchList();
            modal.dismiss('Cross click');
            this.toastr.success(res.data, 'Success!');
          }, err => {
            this.spinner.hide();
            modal.dismiss('Cross click');
            if (err.error.error.reason) {
              this.toastr.error(err.error.error.reason);
              modal.dismiss('Cross click');
            }
          })
    } else {
      this.employeeServiceService.createsuperadminsetting(this.superAdminForm.value).pipe(first())
        .subscribe(
          res => {
            this.toastr.success(res.data, 'Success!');
            modal.dismiss('Cross click');

          }, err => {
            if (err.error.error.reason) {
              this.toastr.error(err.error.error.reason);
            }
            this.spinner.hide();
          });
    }
  }
  editBatch(list, content) {
    console.log(list.id)
    this.spinner.show();
    this.buttonText = "Update"
    this.superAdminSubmitted = false;
    this.employeeServiceService.getSuperAdminId(list.id).pipe(first()).subscribe(res => {
      this.superAdminArr = res.data;
      console.log(this.superAdminArr)
      this.superAdminObj = res.data;
      this.spinner.hide();
    }, err => {
      this.spinner.show();
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
      }
      this.spinner.hide();
    })
    this.modalService.open(content, { size: 'lg' });
  }
  
}
