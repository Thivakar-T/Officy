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
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  configData;
  schemeId: any;
  projectObj: any = {};
  projectArr: any = [];
  public projectForm: FormGroup;
  myDate = new Date();
  projectSubmitted = false;
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
    this.projectForm = this.formBuilder.group(
      {
        id: [null],
        projectName: [null],
        quotationFile: [null],
        status: [null],
      })
    this.configData = {
      suppressScrollX: true,
      wheelSpeed: 0.3
    };
    this.getBatchList();
  }
  getBatchList() {

    $('#adminlist').DataTable().clear().destroy();
    this.employeeServiceService.projectGet().pipe(first()).subscribe(res => {
      console.log(res)
      this.projectArr = res.data;
      console.log(this.projectArr)
      $(document).ready(function () {
        $('#adminlist').DataTable({
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
    this.projectForm.reset({});
    this.projectObj = {};
    this.projectSubmitted = false;
    this.modalService.open(content, { size: 'lg' });
  }
  openModal(content: any, schemeId,) {
    if (schemeId) {
      this.schemeId = schemeId;
      this.modalService.open(content, { size: 'md' });
    }
  }
  Submit(modal) {
    this.projectSubmitted = true;
    if (this.projectForm.invalid) {
      return;
    }

    if (this.projectObj.id) {
      console.log(this.projectObj.id)
      this.projectForm.value.id = this.projectObj.id;
      this.employeeServiceService.projectUpdate(this.projectForm.value).pipe(first())
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
      this.employeeServiceService.projectCreate(this.projectForm.value).pipe(first())
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
    this.projectSubmitted = false;
    this.employeeServiceService.projectGetId(list.id).pipe(first()).subscribe(res => {
      this.projectObj = res.data;
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
  deleteData(modal) {

    this.employeeServiceService.projectDelete(this.schemeId).pipe(first()).subscribe((res: any) => {
      console.log(res)
      this.toastr.success(res.data, 'Success!');
      modal.dismiss('Cross click');
      this.getBatchList();
    }, err => {
      // console.log(this.Role)
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
      }
      modal.dismiss('Cross click');
      this.spinner.hide();
    })
  }
}
