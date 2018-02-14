import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApisService } from '../../apis.service';

@Component({
  selector: 'store-apisearch-result',
  templateUrl: './apisearch-result.component.html',
  styleUrls: ['./apisearch-result.component.scss']
})
export class ApisearchResultComponent implements OnInit {

  dataSource = [1, 2, 3];
  constructor() {
  }

  ngOnInit() {
  }
}
