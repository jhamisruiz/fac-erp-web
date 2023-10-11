import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tools',
  templateUrl: './app-tool.component.html',
  styleUrls: ['./app-tool.component.scss'],
})
export class AppToolComponent implements OnInit {

  @Input() isBtnNew = false;
  @Input() isBtnSave = false;

  @Output() OnClickNew = new EventEmitter<any>();
  @Output() OnClickSave = new EventEmitter<any>();
  @Output() OnClickBack = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    if (1) { }
  }

  onClickNew(): void {
    this.OnClickNew.emit();
  }

  onClickSave(): void {
    this.OnClickSave.emit();
  }

  onClickBack(): void {
    this.OnClickBack.emit();
  }
}
