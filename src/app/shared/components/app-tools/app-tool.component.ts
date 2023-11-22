import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { loadCompAction } from '../../../store/actions/app.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/state/app.state';
import { AppTableService } from '../app-table/app-table.service';
import { Modetype } from '@app/shared/common/interfaces';

@Component({
  selector: 'app-tools',
  templateUrl: './app-tool.component.html',
  styleUrls: ['./app-tool.component.scss'],
})
export class AppToolComponent implements OnInit {

  @Input() isBtnNew = true;

  @Input() isBtnSave = true;
  @Input() saveDisabled = false;

  @Input() isBtnBack = true;
  @Input() ViewMode!: Modetype;

  @Output() OnClickNew = new EventEmitter<any>();
  @Output() OnClickSave = new EventEmitter<any>();
  @Output() OnClickBack = new EventEmitter<any>();

  btnSave = false;
  constructor(private store: Store<AppState>, private ts: AppTableService) {
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

}
