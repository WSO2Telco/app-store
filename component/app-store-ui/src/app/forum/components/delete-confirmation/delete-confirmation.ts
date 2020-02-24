import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';

@Component({
    selector: 'delete-confirmation-dialog',
    template: `
  <div mat-dialog-content>
    <h2>Confirm Delete ?</h2>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="onNoClick()" cdkFocusInitial>Cancel</button>
    <button mat-button mat-dialog-close="delete">Delete</button>
  </div>`,
  })
  export class DeleteConfirmationDialog {
  
    constructor(public dialogRef: MatDialogRef<DeleteConfirmationDialog>) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
}