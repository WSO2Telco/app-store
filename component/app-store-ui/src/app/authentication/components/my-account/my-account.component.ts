import { Component, OnInit, ViewChild } from "@angular/core";
import { ResetPasswordParam } from "../../authentication.data.models";
import { AppState } from "../../../app.data.models";
import { Store } from "@ngrx/store";
import { Actions } from '@ngrx/effects';
import { NgForm } from '@angular/forms';
import { ChangeUserPwAction } from '../../authentication.actions';

@Component({
  selector: "store-my-account",
  templateUrl: "./my-account.component.html",
  styleUrls: ["./my-account.component.scss"]
})
export class MyAccountComponent implements OnInit {
  @ViewChild(NgForm, {static:false}) changePwForm: NgForm;
  
  param: ResetPasswordParam;
  confirmPassword:string;

  constructor(private store: Store<AppState>,private actions: Actions) {}

  ngOnInit() {
    this.param = new ResetPasswordParam();
    // this.actions.ofType(authActions.CHANGE_USER_PW_SUCCESS).subscribe((r)=>this.changePwForm.reset());
  }

  onChangePw(form) {
    this.store.dispatch(ChangeUserPwAction({"payload" : this.param}));
  }
}
