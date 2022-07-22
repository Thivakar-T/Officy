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
  selector: 'app-fees-payment-page',
  templateUrl: './fees-payment-page.component.html',
  styleUrls: ['./fees-payment-page.component.scss']
})
export class FeesPaymentPageComponent implements OnInit {
  configData;
  feesPayObj: any = {};
  obj: any = {};
  feesArr: any = [];
  paymentTypeArr: any = ['CASH', 'GPAY'];
  paymentStatusArr: any = ['PAID', 'UNPAID'];
  employeeNameArr: any = [];
  public fessPaymentForm: FormGroup;
  myDate = new Date();
  subjectSubmitted = false;
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
    this.fessPaymentForm = this.formBuilder.group(
      {
        id: [null],
        balance: [null],
        date: [null],
        employeeId: [null],
        paidAmount: [null],
        paymentStatus: [null],
        paymentType: [null],
        status: [null],
      })
    this.getBatchList()
    this.getEMployeeList()
    this.obj = this.authenticationService.currentUser()
    console.log(this.obj.data.name)
    console.log(this.obj.data.employeeId)
    let emId = this.obj.data.employeeId
  }
  getEMployeeList() {
    this.employeeServiceService.get().pipe(first())
      .subscribe(
        res => {
          this.employeeNameArr = res.data
          console.log(res)
          console.log(this.employeeNameArr)
        })
  }
  Submit(modal) {
    function pad(n) {
      return n < 10 ? '0' + n : n;
    }
    console.log(this.fessPaymentForm.value)
    // let emId = this.obj.data.employeeId
    // console.log(emId)
    // console.log(this.feesPayObj.id + "haiiiiiiiiiiiii")

    // this.fessPaymentForm.value.employeeId = emId
    console.log(this.fessPaymentForm.value.employeeId)
    this.fessPaymentForm.value.date = this.fessPaymentForm.value.date.year + '-' + pad(this.fessPaymentForm.value.date.month) + '-' + pad(this.fessPaymentForm.value.date.day);

    if (this.feesPayObj.id) {
      console.log(this.feesPayObj.id)
      this.fessPaymentForm.value.id = this.feesPayObj.id;
      this.employeeServiceService.updateFeesPayment(this.fessPaymentForm.value).pipe(first())
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
      this.employeeServiceService.createFeesPayment(this.fessPaymentForm.value).pipe(first())
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
  openSubject(content: any) {
    this.buttonText = "Submit";
    this.fessPaymentForm.reset({});
    this.feesPayObj = {};
    this.subjectSubmitted = false;
    this.modalService.open(content, { size: 'lg' });
  }
  getBatchList() {
    $('#feeslist').DataTable().clear().destroy();
    this.employeeServiceService.getFeesPayment().pipe(first()).subscribe(res => {
      console.log(res)
      this.feesArr = res.data;
      console.log(this.feesArr)
      $(document).ready(function () {
        $('#feeslist').DataTable({
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
  editBatch(list, content) {
    console.log(list.id)
    console.log(list.employeeId)
    this.spinner.show();
    this.buttonText = "Update"
    this.subjectSubmitted = false;
    this.employeeServiceService.getFeesPaymentId(list.employeeId).pipe(first()).subscribe(res => {
      console.log(res)
      this.feesPayObj = res.data;
      console.log(this.feesPayObj.date)
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
