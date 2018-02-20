import { Component, OnInit, Input } from '@angular/core';
import { ApiOverview } from '../../apis.models';

@Component({
  selector: 'store-api-overview',
  templateUrl: './api-overview.component.html',
  styleUrls: ['./api-overview.component.scss']
})
export class ApiOverviewComponent implements OnInit {
  @Input() public apiOverview: ApiOverview;

  constructor() {}

  ngOnInit() {}
}
