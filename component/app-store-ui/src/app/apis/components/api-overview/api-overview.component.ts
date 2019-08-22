import { Component, OnInit, Input } from '@angular/core';
import { ApiOverview } from '../../apis.models';
import { NotificationService } from '../../../shared/services/notification.service';
import { ApiEndpoints } from '../../../config/api.endpoints';

@Component({
  selector: 'store-api-overview',
  templateUrl: './api-overview.component.html',
  styleUrls: ['./api-overview.component.scss']
})
export class ApiOverviewComponent implements OnInit {
  @Input() public apiOverview: ApiOverview;
  public apiPrefix = ApiEndpoints.apiContext;

  constructor(private notification: NotificationService) { }

  ngOnInit() {
    console.log(this.apiOverview);
  }

  copyToClipboard(ele) {
    ele.select();
    document.execCommand('copy');
    ele.setSelectionRange(0, 0);
    this.notification.success('Copy to clipboard');
  }
}
