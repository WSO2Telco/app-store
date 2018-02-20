import { Component, OnInit, Input } from '@angular/core';
import { ApiSummery } from '../../apis.models';

@Component({
  selector: 'store-api-info',
  templateUrl: './api-info.component.html',
  styleUrls: ['./api-info.component.scss']
})
export class ApiInfoComponent implements OnInit {
  @Input() api: ApiSummery;

  constructor() {}

  ngOnInit() {}
}
