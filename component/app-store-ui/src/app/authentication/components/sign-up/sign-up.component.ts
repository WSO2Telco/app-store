import { Component, OnInit } from '@angular/core';

//Breadcrumbs
import * as globalActions from "../../../app.actions";
import { BreadcrumbItem } from "../../../app.data.models";
import { Title } from '@angular/platform-browser';
import { AppState } from '../../../app.data.models';
import { Store } from '@ngrx/store';
import { NgForm, FormGroup, FormBuilder, Validators, FormGroupDirective, AbstractControl, FormControl } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { SigUpUserParam } from '../../authentication.models';
import { SignupUserSuccessAction, SignupUserAction } from '../../authentication.actions';
import { ErrorStateMatcher } from '@angular/material/core';

export class SignUpErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'store-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public user: SigUpUserParam;
  matcher = new SignUpErrorStateMatcher();
  formSignupApp: FormGroup;
  submitted = false;

  constructor(
    private store: Store<AppState>,
    private titleService: Title,
    private fb: FormBuilder,
    private actions$: Actions,

  ) {
  this.formSignupApp = this.fb.group({
    firstName: ['', [Validators.required, Validators.maxLength(20), Validators.pattern("[a-zA-Z\s]+$")]],
    lastName: ['', [Validators.required, Validators.maxLength(40), Validators.pattern("[a-zA-Z\s]+$")]],
    email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    userName: ['', [Validators.required, Validators.minLength(5)]],
    password: ['', [Validators.required, Validators.minLength(5), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[0-9A-Za-z\d$@$!%*?&].{8,}')]],
    confirmPassword: ['']
  },{ validator: this.checkPasswords });
  }

  ngOnInit() {
    this.user = new SigUpUserParam();
    this.store.dispatch(globalActions.SetBreadcrumbAction({ payload: [new BreadcrumbItem("Applications")] }));
    this.titleService.setTitle("Create New App | Apigate API Store");
  }

  checkPasswords(group: FormGroup) { 
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;
  
    return pass === confirmPass ? null : { notSame: true }
  }

  get f() { return this.formSignupApp.controls; }

  onSubmit(fData: any, formDirective: FormGroupDirective) {
    this.submitted = true;
    if (this.formSignupApp.invalid) {
      return;
    } else {
      this.user.allFieldsValues = this.formSignupApp.value.firstName + '|' + this.formSignupApp.value.lastName + '|' + this.formSignupApp.value.email;
      this.user.username = this.formSignupApp.value.userName;
      this.user.password = this.formSignupApp.value.password;
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
