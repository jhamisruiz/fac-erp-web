import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { loadCompAction } from '../../../store/app/actions/app.actions';
import { Store } from '@ngrx/store';
import { AppStateStore } from '../../../store/app.state';
import { AppTableService } from '../app-table/app-table.service';
import { Modetype } from '@app/shared/common/interfaces';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-tools',
  templateUrl: './app-tool.component.html',
  styleUrls: ['./app-tool.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class AppToolComponent implements OnInit {

  @Input() isBtnNew = true;

  @Input() isBtnSave = true;
  @Input() saveDisabled = false;

  @Input() isBtnBack = true;
  @Input() ViewMode!: Modetype;

  @Input() set Message(sms: Message[]) {
    if (sms?.length) {
      this.messages = sms;
    }
  }
  messages!: Message[];

  @Input() set setMessage(sms: any) {
    if (sms) {
      this.toast(sms);
    }
  }

  @Output() OnClickNew = new EventEmitter<any>();
  @Output() OnClickSave = new EventEmitter<any>();
  @Output() OnClickBack = new EventEmitter<any>();

  btnSave = false;
  constructor(private store: Store<AppStateStore>, private messageService: MessageService, private ts: AppTableService) {
    this.ts.changeState$.subscribe((r: boolean) => {
      this.btnSave = r ? false : true;
    });
  }

  ngOnInit(): void {
    if (1) { }
  }

  onClickNew(): void {
    this.store.dispatch(loadCompAction({ formMode: 'CREATE', id: null }));
    this.OnClickNew.emit('CREATE');
  }

  onClickSave(): void {
    this.OnClickSave.emit();
  }

  onClickBack(): void {
    this.store.dispatch(loadCompAction({ formMode: 'VIEW', id: null }));
    this.OnClickBack.emit('VIEW');
  }

  toast(s: string): void {
    this.messageService.add({ severity: 'warning', summary: 'Warning', detail: s });
  }
}
