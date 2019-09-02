import { Component, OnInit, ViewChild } from "@angular/core";
import { SigUpUserParam } from "../../authentication.data.models";
import { AppState } from "../../../app.data.models";
import { Store } from "@ngrx/store";
import * as authActions from "../../authentication.actions";
import { Actions } from "@ngrx/effects";
import { NgForm } from "@angular/forms";

@Component({
  selector: "store-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"]
})
export class SignUpComponent implements OnInit {
  @ViewChild(NgForm, {static:false}) signupForm: NgForm;

  public user: SigUpUserParam;
  public confirmPassword:string;

  constructor(private store: Store<AppState>, private actions: Actions) {}

  ngOnInit() {
    this.user = new SigUpUserParam();
    // this.actions.ofType(authActions.SIGNUP_USER_SUCCESS).subscribe(s => {
    //   this.signupForm.reset();
    // });
  }

  onSignup(form) {
    if (form.valid) {
      this.store.dispatch(new authActions.SignupUserAction(this.user));
    }
  }
}
