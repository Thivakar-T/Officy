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

const URL = 'https://your-url.com';
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  configData;
  attendanceObj: any = {};
  obj: any = {};
  attendanceArr: any = [];
  attArr: any = [];
  public attendanceForm: FormGroup;
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
  ) {
  }

  ngOnInit(): void {
    this.attendanceForm = this.formBuilder.group(
      {
        id: [null],
        checkinStatus: [null],
        checkoutStatus: [null],
        checkinDate: [null],
        checkinTime: [null],
        checkoutDate: [null],
        checkoutTime: [null],
        employeeId: [null],
      })

    console.log(this.authenticationService.getToken())
    console.log(this.authenticationService.currentUser())
    this.obj = this.authenticationService.currentUser()
    console.log(this.obj.data.name)
    console.log(this.obj.data.employeeId)
    let emId = this.obj.data.employeeId
    this.getBatchList(emId)
  }

  getBatchList(empId: any) {
    empId = this.obj.data.employeeId;
    console.log(empId)
    $('#attendanceList').DataTable().clear().destroy();
    this.employeeServiceService.getAttendance(empId).pipe(first()).subscribe(res => {
      console.log(res)
      this.attendanceArr = res.data;
      console.log(this.attendanceArr)
      $(document).ready(function () {
        $('#attendanceList').DataTable({
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
    this.attendanceForm.reset({});
    this.attendanceObj = {};
    this.subjectSubmitted = false;
    this.modalService.open(content, { size: 'xl' });
  }
  Submit(modal) {
    console.log(this.attArr.id)
    if (this.attArr.id) {
      console.log(this.attArr.id)
      this.attendanceForm.value.id = this.attArr.id;
      this.attendanceForm.value.employeeId = this.attArr.employeeId;
      this.employeeServiceService.updateAttendance(this.attendanceForm.value).pipe(first())
        .subscribe(
          res => {
            console.log(res)
            // this.getBatchList();
            this.toastr.success(res.data, 'Success!');
            this.toastr.success(res.data, 'Success!');
            modal.dismiss('Cross click');
          }, err => {
            this.spinner.hide();
            if (err.error.error.reason) {
              this.toastr.error(err.error.error.reason);
            }
          })
    } else {
      this.employeeServiceService.createAttendance(this.attendanceForm.value).pipe(first())
        .subscribe(
          res => {
            console.log(res)
            modal.dismiss('Cross click');
            this.toastr.success(res.data, 'Success!');

          }, err => {
            if (err.error.error.reason) {
              this.toastr.error(err.error.error.reason);
            }
            this.spinner.hide();
          });
    }
  }
  checkInValue(event) {
    if (event.target.checked == true) {
      this.attendanceForm.value.checkinStatus = 1;
      //   var transformDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
      //   this.attendanceForm.value.checkinDate = transformDate;
      this.attendanceForm.value.checkinTime = this.myDate;
      this.attendanceForm.value.attendanceStatus = "PRESENT";
    } else if (event.target.checked == false) {
      this.attendanceForm.value.checkinStatus = 0;
      this.attendanceForm.value.attendanceStatus = "ABSENT";
    }
  }
  checkOutValue(event) {
    if (event.target.checked == true) {
      this.attendanceForm.value.checkoutTime = this.myDate;
      this.attendanceForm.value.checkoutStatus = 1;
      this.attendanceForm.value.attendanceStatus = "PRESENT";
    } else if (event.target.checked == false) {
      this.attendanceForm.value.checkoutStatus = 0;
      this.attendanceForm.value.attendanceStatus = "ABSENT";
    }
  }

  editBatch(list, content) {
    console.log(list.id)
    this.spinner.show();
    this.buttonText = "Update"
    this.subjectSubmitted = false;
    this.employeeServiceService.getAttendanceDetailsId(list.id).pipe(first()).subscribe(res => {
      this.attArr = res.data;
      console.log(this.attArr)
      if (this.attendanceObj.dateOfBirth) {
        var toDate = this.attendanceObj.dateOfBirth.split('-');
        let date1 = new Date(toDate[2] + '-' + toDate[1] + ' ' + toDate[0]);
        this.attendanceObj.dateOfBirth = { year: date1.getFullYear(), month: date1.getMonth() + 1, day: date1.getDate() };
      }
      if (this.attendanceObj.dateOfJoining) {
        var toDate1 = this.attendanceObj.dateOfJoining.split('-');
        let date2 = new Date(toDate1[2] + '-' + toDate1[1] + ' ' + toDate1[0]);
        this.attendanceObj.dateOfJoining = { year: date2.getFullYear(), month: date2.getMonth() + 1, day: date2.getDate() };
      }
      this.spinner.hide();
    }, err => {
      this.spinner.show();
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
      }
      this.spinner.hide();
    })
    this.modalService.open(content, { size: 'xl' });
  }
}
