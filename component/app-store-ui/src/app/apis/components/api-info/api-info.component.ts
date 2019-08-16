import { Component, OnInit, Input } from '@angular/core';
import { ApiSummery } from '../../apis.models';
import { ApiEndpoints } from '../../../config/api.endpoints';

@Component({
  selector: 'store-api-info',
  templateUrl: './api-info.component.html',
  styleUrls: ['./api-info.component.scss']
})
export class ApiInfoComponent implements OnInit {
  apiPrefix = ApiEndpoints.apiContext;
  @Input() api: ApiSummery;

  constructor() {}

  ngOnInit() {}
}
