import { Component, OnInit } from '@angular/core';

//Breadcrumbs
import * as globalActions from "../../../app.actions";
import { BreadcrumbItem } from "../../../app.data.models";
import { Title } from '@angular/platform-browser';
import { AppState } from '../../../app.data.models';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators, FormGroupDirective, AbstractControl } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { SigUpUserParam } from '../../authentication.models';
import { SignupUserSuccessAction, SignupUserAction } from '../../authentication.actions';

@Component({
  selector: 'store-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public user: SigUpUserParam;
  formSignupApp: FormGroup;
  submitted = false;
  public appDescription: string;
  public appName: string;
  public confirmPassword: string;
  public userName: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;

  constructor(
    private store: Store<AppState>,
    private titleService: Title,
    private fb: FormBuilder,
    private actions$: Actions,

  ) { }

  ngOnInit() {
    this.user = new SigUpUserParam();
    this.store.dispatch(globalActions.SetBreadcrumbAction({ payload: [new BreadcrumbItem("Applications")] }));
    this.titleService.setTitle("Create New App | Apigate API Store");

    this.formSignupApp = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(20), Validators.pattern("[a-zA-Z\s]+$")]],
      lastName: ['', [Validators.required, Validators.maxLength(40), Validators.pattern("[a-zA-Z\s]+$")]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      userName: ['', [Validators.required, Validators.minLength(5), Validators.pattern("[a-zA-Z\s]+$")]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
    });
  }

  get f() { return this.formSignupApp.controls; }

  onSubmit(fData: any, formDirective: FormGroupDirective) {
    this.submitted = true;
    if (this.formSignupApp.invalid) {
      return;
    } else {
      this.user.allFieldsValues = this.firstName + '|' + this.lastName + '|' + this.email;
      this.user.username = this.userName;
      this.user.password = this.password;
      this.store.dispatch(SignupUserAction({ "payload": this.user }));

      this.actions$.pipe(ofType(SignupUserSuccessAction)).subscribe(p => {
        this.submitted = false;
        formDirective.resetForm();
        this.formSignupApp.reset();
      })
    }
  }

  onReset() {
    this.submitted = false;
    this.formSignupApp.reset();
  }

}
