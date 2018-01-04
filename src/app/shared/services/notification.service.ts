import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from '../components/notification/notification.component';
import { NotificationTypes } from '../models/shared.models';

@Injectable()
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  error(msg: string) {
    this.show(NotificationTypes.ERROR, msg);
  }
  success(msg: string) {
    this.show(NotificationTypes.SUCCESS, msg);
  }
  warning(msg: string) {
    this.show(NotificationTypes.WARNING, msg);
  }
  info(msg: string) {
    this.show(NotificationTypes.INFO, msg);
  }

  private show(type: NotificationTypes, msg: string): void {
    this.snackBar.openFromComponent(NotificationComponent, {
      data: {
        type,
        message: msg
      },
     // duration: 3000
    });
  }

}
