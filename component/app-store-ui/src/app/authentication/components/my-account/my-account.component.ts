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
  //@ViewChild(NgForm, { static: false }) changePwForm: NgForm;
  updatePwForm: FormGroup;
  matcher = new UpdatePwErrorStateMatcher();
  param: ResetPasswordParam;
  confirmPassword: string;

  constructor(private store: Store<AppState>, private actions: Actions,private formBuilder: FormBuilder) {
    this.updatePwForm = this.formBuilder.group({
      currentpassword: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['']
    }, { validator: this.checkPasswords });
   }

  ngOnInit() {
    this.param = new ResetPasswordParam();
    // this.actions.ofType(authActions.CHANGE_USER_PW_SUCCESS).subscribe((r)=>this.changePwForm.reset());
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  let pass = group.controls.password.value;
  let confirmPass = group.controls.confirmPassword.value;

  return pass === confirmPass ? null : { notSame: true }
}

  onChangePw(form:any, formDirective: FormGroupDirective) {
    if (this.updatePwForm.valid) {
      this.param.currentPassword = this.updatePwForm.value.currentpassword;
      this.param.newPassword = this.updatePwForm.value.password;
      console.log(this.param)
      this.store.dispatch(ChangeUserPwAction({ "payload": this.param }));

      this.actions.pipe(ofType(ChangeUserPwSuccessAction)).subscribe(p => {
      /*   this.submitted = false;
        formDirective.resetForm(); */
        formDirective.resetForm();
        this.updatePwForm.reset();
      })
    } else { 
      console.log('error');
    }
  }
}
