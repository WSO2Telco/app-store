import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { NotificationData, NotificationTypes } from '../../models/shared.models';

@Component({
  selector: 'store-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  public styleClass: NotificationTypes;
  public message: string;
  public iconName: string;

  public iconCollection = {
    ERROR: 'error_outline',
    SUCCESS: 'done',
    INFO: 'info_outline',
    WARNING: 'warning',
    DEFAULT : 'add_alert'
  };

  constructor( @Inject(MAT_SNACK_BAR_DATA) public data: NotificationData) { }

  ngOnInit() {
    this.styleClass = this.data.type;
    this.message = this.data.message;
    this.iconName = this.iconCollection[this.data.type] || this.iconCollection['DEFAULT'];
  }

}
