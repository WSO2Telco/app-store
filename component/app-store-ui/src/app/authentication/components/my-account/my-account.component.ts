import { Component, OnInit, ViewChild } from "@angular/core";
import { ResetPasswordParam } from "../../authentication.models";
import { AppState } from "../../../app.data.models";
import { Store } from "@ngrx/store";
import { Actions, ofType } from '@ngrx/effects';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { ChangeUserPwAction, ChangeUserPwSuccessAction } from '../../authentication.actions';
import { ErrorStateMatcher } from '@angular/material/core';

export class UpdatePwErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: "store-my-account",
  templateUrl: "./my-account.component.html",
  styleUrls: ["./my-account.component.scss"]
})
export class MyAccountComponent implements OnInit {
  updatePwForm: FormGroup;
  matcher = new UpdatePwErrorStateMatcher();
  param: ResetPasswordParam;
  confirmPassword: string;

  constructor(private store: Store<AppState>, private actions: Actions,private formBuilder: FormBuilder) {
    this.updatePwForm = this.formBuilder.group({
      currentpassword: ['', [Validators.required]],
      password: ['', [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      confirmPassword: ['']
    }, { validator: this.checkPasswords });
   }

  ngOnInit() {
    this.param = new ResetPasswordParam();
  }

  checkPasswords(group: FormGroup) { 
  let pass = group.controls.password.value;
  let confirmPass = group.controls.confirmPassword.value;

  return pass === confirmPass ? null : { notSame: true }
}

  onChangePw(form:any, formDirective: FormGroupDirective) {
    if (this.updatePwForm.valid) {
      this.param.currentPassword = this.updatePwForm.value.currentpassword;
      this.param.newPassword = this.updatePwForm.value.password;
      this.store.dispatch(ChangeUserPwAction({ "payload": this.param }));

      this.actions.pipe(ofType(ChangeUserPwSuccessAction)).subscribe(p => {
        formDirective.resetForm();
        this.updatePwForm.reset();
      })
    }
  }

  onReset() {
    this.updatePwForm.reset();
  }
}
