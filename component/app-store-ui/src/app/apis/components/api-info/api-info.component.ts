import { Component, OnInit, Input } from '@angular/core';
import { ApiSummery } from '../../apis.models';
import { ApiEndpoints } from '../../../config/api.endpoints';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'store-api-info',
  templateUrl: './api-info.component.html',
  styleUrls: ['./api-info.component.scss']
})
export class ApiInfoComponent implements OnInit {
  apiPrefix = ApiEndpoints.apiContext;
  urlprefix = (environment.production) ? "/app-store/public" : "";
  @Input() api: ApiSummery;

  constructor() {}

  ngOnInit() {}
}
