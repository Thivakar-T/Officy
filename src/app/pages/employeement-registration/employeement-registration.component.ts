import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
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
  selector: 'app-employeement-registration',
  templateUrl: './employeement-registration.component.html',
  styleUrls: ['./employeement-registration.component.scss']
})
export class EmployeementRegistrationComponent implements OnInit {
  configData;
  schemeId: any;
  Role: any;
  public emailVar;
  public coreConfig: any;
  public empFormSubmitted = false;
  public empForm: FormGroup;
  id: any;
  private _unsubscribeAll: Subject<any>;
  empObj: any = {};
  subjectForm: FormGroup;
  subjectSubmitted = false;
  buttonText: string = "";
  employeeArr: any = [];
  streamArr: any = ['FRONTEND', 'BACKEND', 'FULLSTACK'];
  roleArr: any = ['ADMIN', 'EMPLOYEE'];
  acceptSubmitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private route: ActivatedRoute,
    // private employeeServiceService: AuthenticationService,
    private dashboardService: DashboardService,
    private modalService: NgbModal,
    private employeeServiceService: EmployeeServiceService,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService
  ) {

  }

  ngOnInit(): void {
    this.empForm = this.formBuilder.group(
      {
        id: [null],
        empNo: [null],
        name: [null, Validators.required],
        phoneNo: [null, [Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
        email: [null, [Validators.required, Validators.email]],
        fileUploadPhoto: [null],
        fileUploadCertification: [null],
        permanentAddress: [null, Validators.required],
        temporaryAddress: [null],
        aadharCardNo: [null, [Validators.pattern("^[0-9]*$"), Validators.minLength(12), Validators.maxLength(12)]],
        adharPhoto: [null],
        qualification: [null, Validators.required],
        age: [0, Validators.required],
        dateOfBirth: [null, Validators.required],
        dateOfJoining: [null, Validators.required],
        bloodGroup: [null],
        role: [null],
        requestId: [null],
        requestStatus: [null],
        stream: [null],
      }
    );
    this.configData = {
      suppressScrollX: true,
      wheelSpeed: 0.3
    };
    this.getBatchList();
    this.checksAge();
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      // alert("Accept the request")
      this.acceptSubmitted = true;
    }
  }
  getBatchList() {
    $('#emplist').DataTable().clear().destroy();
    this.employeeServiceService.get().pipe(first()).subscribe(res => {
      console.log(res)
      this.employeeArr = res.data;
      console.log(this.employeeArr)
      $(document).ready(function () {
        $('#emplist').DataTable({
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
  open(content) {
    this.buttonText = "Submit";
    this.empObj = {};
    this.subjectSubmitted = false;
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    if (this.id) {
      this.employeeServiceService.getEmployee(this.id).pipe(first()).subscribe(res => {
        this.empObj = res.data;
        if (this.empObj.dateOfBirth) {
          var toDate = this.empObj.dateOfBirth.split('-');
          let date1 = new Date(toDate[2] + '-' + toDate[1] + ' ' + toDate[0]);
          this.empObj.dateOfBirth = { year: date1.getFullYear(), month: date1.getMonth() + 1, day: date1.getDate() };
        }
        console.log(res)
      })

    }
    console.log(this.id)
    this.empObj.id = null;
    console.log(this.id)
    this.modalService.open(content, { size: 'lg' });
  }
  openSubject(content: any) {
    this.buttonText = "Submit";
    this.empForm.reset({});
    this.empObj = {};
    this.subjectSubmitted = false;
    this.modalService.open(content, { size: 'lg' });
  }

  get f() {
    return this.empForm.controls;
  }
  checkValue(event) {
    console.log(event.target.checked)
    if (event.target.checked == true) {
      console.log(this.empForm.value.permanentAddress)

      this.empObj.temporaryAddress = this.empForm.value.permanentAddress,
        console.log(this.empObj.temporaryAddress)

    } else if (event.target.checked == false) {
      this.empObj.temporaryAddress = ""
    }
  }
  checksAge() {
    console.log(this.empForm.value)
    console.log(this.empObj)
    console.log(this.empForm.value.dateOfJoining)
    console.log(this.empForm.value.dateOfBirth)
    console.log(this.empForm.value.age)
    this.empObj.age = 0
    this.empObj.age = this.empForm.value.dateOfJoining.year - this.empForm.value.dateOfBirth.year;
    console.log(this.empObj.age)
  }
  Submit(modal) {
    this.empFormSubmitted = true;
    if (this.empForm.invalid) {
      return;
    }
    console.log(this.id)
    function pad(n) {
      return n < 10 ? '0' + n : n;
    }
    console.log(this.empForm.value);

    this.empForm.value.age = this.empForm.value.dateOfJoining.year - this.empForm.value.dateOfBirth.year;
    console.log(this.empForm.value.dateOfJoining.year)
    console.log(this.empForm.value.dateOfBirth.year)
    console.log(this.empForm.value.age)
    console.log(this.empForm.value.dateOfBirth)
    this.empObj.age = this.empForm.value.age;
    console.log(this.empObj.age)
    this.empForm.value.dateOfBirth = this.empForm.value.dateOfBirth.year + '-' + pad(this.empForm.value.dateOfBirth.month) + '-' + pad(this.empForm.value.dateOfBirth.day);
    console.log(this.empForm.value.dateOfBirth)
    this.empForm.value.dateOfJoining = this.empForm.value.dateOfJoining.year + '-' + pad(this.empForm.value.dateOfJoining.month) + '-' + pad(this.empForm.value.dateOfJoining.day);

    console.log(this.empObj.requestStatus)

    if (this.empObj.requestStatus) {
      this.empForm.value.requestId = this.id,
        this.empForm.value.requestStatus = "APPROVAL",
        this.empObj.id = null
    }
    if (this.empObj.id) {
      console.log(this.empObj.id)
      this.empForm.value.id = this.empObj.id;
      this.employeeServiceService.updateRegistration(this.empForm.value).pipe(first())
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
      this.employeeServiceService.empReg(this.empForm.value).pipe(first())
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
  click() {
    this._router.navigate(['/pages/empty']);
  }
  editBatch(list, content) {
    console.log(list.id)
    this.spinner.show();
    this.buttonText = "Update"
    this.subjectSubmitted = false;
    this.employeeServiceService.getidData(list.id).pipe(first()).subscribe(res => {
      this.empObj = res.data;
      if (this.empObj.dateOfBirth) {
        var toDate = this.empObj.dateOfBirth.split('-');
        let date1 = new Date(toDate[2] + '-' + toDate[1] + ' ' + toDate[0]);
        this.empObj.dateOfBirth = { year: date1.getFullYear(), month: date1.getMonth() + 1, day: date1.getDate() };
      }
      if (this.empObj.dateOfJoining) {
        var toDate1 = this.empObj.dateOfJoining.split('-');
        let date2 = new Date(toDate1[2] + '-' + toDate1[1] + ' ' + toDate1[0]);
        this.empObj.dateOfJoining = { year: date2.getFullYear(), month: date2.getMonth() + 1, day: date2.getDate() };
      }
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
  openModal(content: any, schemeId,) {
    if (schemeId) {
      this.schemeId = schemeId;
      this.modalService.open(content, { size: 'md' });
    }
  }

  deleteData(modal) {
    console.log(this.Role)
    console.log(localStorage.getItem('currentUser'))

    this.Role = JSON.parse(localStorage.getItem('currentUser')).data.Role;
    console.log(this.Role)

    this.employeeServiceService.deleteData(this.schemeId).pipe(first()).subscribe((res: any) => {
      console.log(res)
      this.getBatchList();
      this.toastr.success(res.data, 'Success!');
      modal.dismiss('Cross click');
    }, err => {
      console.log(this.Role)
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
      }
      modal.dismiss('Cross click');
      this.spinner.hide();
    })
  }

}
