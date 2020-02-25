import { Component, OnInit } from '@angular/core';
//Breadcrumbs
import * as globalActions from "../../../app.actions";
import { BreadcrumbItem } from "../../../app.data.models";
import { AppState } from '../../../app.data.models';
import { Store } from '@ngrx/store';
import * as introJs from 'intro.js/intro.js';

@Component({
  selector: 'store-help',
  templateUrl: './help.component.html'
})
export class helpComponent implements OnInit {

  introJS = introJs();

  constructor(
    private store: Store<AppState>
  ) {
    this.introJS.setOptions({
      steps: [
        {
          intro: "Welcome to App store walk-through"
        },
        {
          element: document.querySelector('.tb-logo'),
          intro: "Here is the Customer logo container",
          position: 'bottom'
        },
        {
          element: document.querySelectorAll('.top-right-block')[0],
          intro: "User actions are listed under this section",
          position: 'bottom'
        },
        {
          element: '.breadcrumb-wrap',
          intro: 'Here is the breadcrumb and will be showing the your current location',
          position: 'left'
        },
        {
          element: '.menu-wrapper',
          intro: "Here is the Main menu area so all the navigation place in this section.",
          position: 'bottom'
        },
        {
          element: '.intro-container',
          intro: 'Here is the main title of the relevant section.'
        }
      ]
    });
  }

  ngOnInit() {
    this.introJS.start();
    this.store.dispatch(globalActions.SetBreadcrumbAction({ payload: [new BreadcrumbItem("Help")] }));
  }

}
