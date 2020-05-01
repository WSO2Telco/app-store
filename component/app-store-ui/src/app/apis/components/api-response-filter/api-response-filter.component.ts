import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { saveAs } from 'file-saver';

@Component({
  selector: 'store-api-response-filter',
  templateUrl: './api-response-filter.component.html',
  styleUrls: ['./api-response-filter.component.scss']
})
export class ApiResponseFilterComponent implements OnInit {
  public editorOptions: JsonEditorOptions;
  filteredObject: any

  @ViewChild(JsonEditorComponent, { static: true }) editor: JsonEditorComponent;

  constructor(
    public dialogRef: MatDialogRef<ApiResponseFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.editorOptions = new JsonEditorOptions()
    this.editorOptions.modes = ['code', 'text', 'tree', 'view']; // set all allowed modes
  }

  ngOnInit() {
  }

  onCloseClick(): void {
    this.dialogRef.close(this.data);
  }

  SaveContent() {
    var json = JSON.stringify(this.filteredObject);
    var blob = new Blob([json], { type: "application/json" });
    saveAs(blob, 'Filteredresponse.json');
  }

  getData(data) {
    this.filteredObject = data;
  }

}
