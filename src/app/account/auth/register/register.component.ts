import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../../core/services/auth.service';

import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public coreConfig: any;
  public loading = false;
  public passwordTextType: boolean;
  registerFrom: FormGroup;
  submitted = false;
  error = '';
  returnUrl: string;
  regObj: any = {};
  id: any;
  request: string = "REQUEST";
  // set the currenr year
  year: number = new Date().getFullYear();
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    public spinner: NgxSpinnerService,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.registerFrom = this.formBuilder.group(
      {
        // id: [null],
        name: ['', Validators.required],
        phoneNo: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        permanentAddress: ['', Validators.required],
        temporaryAddress: [null],
        aadharNumber: ['', [Validators.required, Validators.minLength(10)]],
        qualification: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        bloodGroup:['', Validators.required],
        requestStatus:  [null],
      }
    );
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  // year: number = new Date().getFullYear();

  get f() {
    return this.registerFrom.controls;
  }
  onSubmit() {
    function pad(n) {
      return n < 10 ? '0' + n : n;
    }
    console.log(this.registerFrom.value);
    this.submitted = true;
    // console.log(this.registerFrom.value.dateOfBirth)
    this.registerFrom.value.dateOfBirth = this.registerFrom.value.dateOfBirth.year + '-' + pad(this.registerFrom.value.dateOfBirth.month) + '-' + pad(this.registerFrom.value.dateOfBirth.day);
    // console.log(this.registerFrom.value.dateOfBirth)
    console.log(this.registerFrom.value.requestStatus)
    if (this.registerFrom.invalid) {
      return;
    }
    // console.log(this.registerFrom.value)
    // console.log(this.registerFrom.invalid)
    this.registerFrom.value.requestStatus=this.request;
    this.authenticationService.registerEmp(this.registerFrom.value).pipe(first()).subscribe(res => {
      console.log(res+'request');
      this.toastr.success(res.data.message, 'Success!');
      this.router.navigate(['/account/login']); 
      this.spinner.hide();
    },err =>{
      if(err){
        this.toastr.error(err.error.error.message, 'Error!');
      }
      this.spinner.hide();
    });
  }
}
