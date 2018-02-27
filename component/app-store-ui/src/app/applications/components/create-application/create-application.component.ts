import { Component, OnInit } from '@angular/core';
import { CreateApplicationParam } from '../../applications.data.models';

@Component({
  selector: 'store-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.scss']
})
export class CreateApplicationComponent implements OnInit {

  application:CreateApplicationParam = new CreateApplicationParam();
  

  constructor() { }

  ngOnInit() {
  }

}
