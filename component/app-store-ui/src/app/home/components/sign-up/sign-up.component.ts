import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

//Breadcrumbs
import * as globalActions from "../../../app.actions";
import { BreadcrumbItem } from "../../../app.data.models";
import { Title } from '@angular/platform-browser';
import { AppState } from '../../../app.data.models';
import { Store } from '@ngrx/store';
import { NgForm, FormGroup, FormBuilder, Validators, FormGroupDirective, AbstractControl, FormControl } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { SignupUserSuccessAction, SignupUserAction, SignupUserFailedAction } from '../../../authentication/authentication.actions';
import { ErrorStateMatcher } from '@angular/material/core';
import { SigUpUserParam } from '../../../authentication/authentication.models';

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

  public user: SigUpUserParam
  matcher = new SignUpErrorStateMatcher();
  formSignupApp: FormGroup;
  submitted = false;
  public loginError: string;

  constructor(
    private store: Store<AppState>,
    private titleService: Title,
    private fb: FormBuilder,
    private actions$: Actions,
    private cd: ChangeDetectorRef,

  ) {
  this.formSignupApp = this.fb.group({
    firstName: ['', [Validators.required, Validators.maxLength(20), Validators.pattern("[a-zA-Z\s]+$")]],
    lastName: ['', [Validators.required, Validators.maxLength(40), Validators.pattern("[a-zA-Z\s]+$")]],
    email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    userName: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[^<>{}\"/\'/\`/|;:,~!?@#$%^=&*\\]\\\\()\\[¿§«»ω⊙¤°℃℉€¥£¢¡®©+]*$')]],
    password: ['', [Validators.required, Validators.minLength(5), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[0-9A-Za-z\d$@$!%*?&].{8,}')]],
    confirmPassword: ['']
  },{ validator: this.checkPasswords });
  }

  ngOnInit() {
    this.store.dispatch(globalActions.SetBreadcrumbAction({ payload: [new BreadcrumbItem("SignUp")] }));
    this.titleService.setTitle("Create New App | Apigate API Store");

    this.actions$.pipe(ofType(SignupUserFailedAction)).subscribe(msg => {
      this.loginError = msg.payload;
      this.cd.detectChanges();
    })
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
      let allFieldsValues = this.formSignupApp.value.firstName + '|' + this.formSignupApp.value.lastName + '|||' + this.formSignupApp.value.email;
      let username = this.formSignupApp.value.userName;
      let password = this.formSignupApp.value.password;
      this.store.dispatch(SignupUserAction({ "payload": new SigUpUserParam (username,password,allFieldsValues) }));

      this.actions$.pipe(ofType(SignupUserSuccessAction)).subscribe(p => {
        this.submitted = false;
        formDirective.resetForm();
        this.formSignupApp.reset();
      })

      this.submitted = false;
    }
  }

  onReset() {
    this.submitted = false;
    this.formSignupApp.reset();
  }

}
