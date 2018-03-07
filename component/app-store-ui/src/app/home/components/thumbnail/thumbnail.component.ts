import { Component, OnInit, Input } from '@angular/core';
import { ThumbnailParam } from '../../home.data.models';

@Component({
  selector: 'store-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss']
})
export class ThumbnailComponent implements OnInit {

  @Input()
  param:ThumbnailParam;

  constructor() { }

  ngOnInit() {
  }

}
