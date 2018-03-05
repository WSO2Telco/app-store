import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmDialogParam } from '../../commons.data.models';

@Component({
  selector: 'store-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogParam) { }

  ngOnInit() {
  }

}
