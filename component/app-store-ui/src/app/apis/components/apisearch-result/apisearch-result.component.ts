import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { ApisService } from '../../apis.service';
import { ApiSummery } from '../../apis.models';

@Component({
  selector: 'store-apisearch-result',
  templateUrl: './apisearch-result.component.html',
  styleUrls: ['./apisearch-result.component.scss']
})
export class ApisearchResultComponent implements OnInit {

  @Input()
  dataSource: ApiSummery;

  @Output()
  selectApi: EventEmitter<ApiSummery> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  onApiSelceted(api) {
    console.log('hhh');
    this.selectApi.emit(api);
  }
}
