import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActionDialogParam } from '../../commons.data.models';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.data.models';

@Component({
  selector: 'store-action-dialog',
  templateUrl: './action-dialog.component.html',
  styleUrls: ['./action-dialog.component.scss']
})
export class ActionDialogComponent implements OnInit {

  public selected;
  
  constructor(
    public dialogRef: MatDialogRef<ActionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ActionDialogParam,
    private store: Store<AppState>) {
      this.store.select((s) => s.global.layout.appTheme).subscribe((theme) => {
        dialogRef.addPanelClass(theme);
      });
     }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
