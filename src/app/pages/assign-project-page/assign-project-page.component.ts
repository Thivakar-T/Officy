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
  selector: 'app-assign-project-page',
  templateUrl: './assign-project-page.component.html',
  styleUrls: ['./assign-project-page.component.scss']
})
export class AssignProjectPageComponent implements OnInit {

  configData;
  projectObj: any = {};
  projectAssignObj: any = {};
  projectArr: any = [];
  projectNameArr: any = ['GO','COME','ok'];
  statusArr: any = ['TODO','INPROGRESS','COMPLETED'];
  frontEndEmployeeArr: any = ['one','two','three'];
  backEndEmployeeArr: any = ['4','5','6'];
  public projectAssignForm: FormGroup;
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
    this.projectAssignForm = this.formBuilder.group(
      {
        id: [null],
        projectName: [null],
        status: [null],
        frontEndEmployee: [null],
        backEndEmployee: [null],
      })
      this.getBatchList()
  }
  getBatchList() {
    $('#assignlist').DataTable().clear().destroy();
    this.employeeServiceService.getProjectAssignn().pipe(first()).subscribe(res => {
      console.log(res)
      this.projectArr = res.data;
      console.log(this.projectArr)
      $(document).ready(function () {
        $('#assignlist').DataTable({
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
  Submit(modal) {

    if (this.projectAssignObj.id) {
      console.log(this.projectAssignObj.id)
      this.projectAssignForm.value.id = this.projectAssignObj.id;
      this.employeeServiceService.updateProjectAssignn(this.projectAssignForm.value).pipe(first())
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
      this.employeeServiceService.createProjectAssignn(this.projectAssignForm.value).pipe(first())
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
    // this.projectAssignForm.reset({});
    this.projectObj = {};
    this.subjectSubmitted = false;
    this.modalService.open(content, { size: 'lg' });
  }
  onSelectCompany(event){
    console.log(this.projectObj.frontEndEmployee)
    console.log(this.projectObj.backEndEmployee)
  }
  editBatch(list, content) {
    console.log(list.id)
    this.spinner.show();
    this.buttonText = "Update"
    this.subjectSubmitted = false;
    this.employeeServiceService.getProjectAssignnId(list.id).pipe(first()).subscribe(res => {
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
