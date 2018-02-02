import { Output, EventEmitter, Input, Component, OnInit } from '@angular/core';
import { Operator } from '../../../app.models';

@Component({
  selector: 'store-operator-tag',
  templateUrl: './operator-tag.component.html',
  styleUrls: ['./operator-tag.component.scss']
})
export class OperatorTagComponent implements OnInit {

  @Input()
  operator: Operator;

  @Output()
  removeOperator: EventEmitter<Operator> = new EventEmitter<Operator>();

  constructor() { }

  ngOnInit() {
  }

  onRemove() {
    this.removeOperator.emit(this.operator);
  }
}
