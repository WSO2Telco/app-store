import { Component, OnInit, ViewChild } from "@angular/core";
import { ResetPasswordParam, ForgetResetPasswordParam } from "../../authentication.models";
import { AppState } from "../../../app.data.models";
import { Store } from "@ngrx/store";
import { Actions, ofType } from '@ngrx/effects';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { ChangeUserPwAction, ChangeUserPwSuccessAction, UpdateForgetPwAction, UpdateForgetPwSuccessAction } from '../../authentication.actions';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';

export class UpdatePwErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: "store-reset-pw",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"]
})
export class ResetPasswordComponent implements OnInit {
  updatePwForm: FormGroup;
  matcher = new UpdatePwErrorStateMatcher();
  param: ForgetResetPasswordParam;
  confirmPassword: string;
  public username;
  public code;

  constructor(private store: Store<AppState>, private actions: Actions, private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.updatePwForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      confirmPassword: ['']
    }, { validator: this.checkPasswords });
  }

  ngOnInit() {
    this.param = new ForgetResetPasswordParam();

    this.route.params.subscribe(p => {
      this.username = p['username'];
    })


    this.route.params.subscribe(p => {
      this.code = p['code'];
    })

  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  onChangePw(form: any, formDirective: FormGroupDirective) {
    if (this.updatePwForm.valid) {
      this.param.code = this.code;
      this.param.username = this.username;
      this.param.newPassword = this.updatePwForm.value.password;
      this.store.dispatch(UpdateForgetPwAction({ "payload": this.param }));

      this.actions.pipe(ofType(UpdateForgetPwSuccessAction)).subscribe(p => {
        formDirective.resetForm();
        this.updatePwForm.reset();
      })
    }
  }

  onReset() {
    this.updatePwForm.reset();
  }
}
