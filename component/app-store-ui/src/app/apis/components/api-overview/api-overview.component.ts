import { Component, OnInit, Input } from '@angular/core';
import { ApiOverview } from '../../apis.models';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'store-api-overview',
  templateUrl: './api-overview.component.html',
  styleUrls: ['./api-overview.component.scss']
})
export class ApiOverviewComponent implements OnInit {
  @Input() public apiOverview: ApiOverview;

  constructor(private notification: NotificationService) { }

  ngOnInit() {
  }

  copyToClipboard(ele) {
    ele.select();
    document.execCommand('copy');
    ele.setSelectionRange(0, 0);
    this.notification.success('Copy to clipboard');
  }
}
