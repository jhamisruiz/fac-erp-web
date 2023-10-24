import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { loadCompAction } from '../../../store/actions/app.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/state/app.state';
import { AppTableService } from '../app-table/app-table.service';

@Component({
  selector: 'app-tools',
  templateUrl: './app-tool.component.html',
  styleUrls: ['./app-tool.component.scss'],
})
export class AppToolComponent implements OnInit {

  @Input() isBtnNew = false;
  @Input() isBtnSave = false;
  @Input() isBtnBack = false;

  @Output() OnClickNew = new EventEmitter<any>();
  @Output() OnClickSave = new EventEmitter<any>();
  @Output() OnClickBack = new EventEmitter<any>();

  constructor(private store: Store<AppState>, private ts: AppTableService) {
    this.ts.changeState$.subscribe((r: boolean) => {
      this.isBtnSave = r ? false : true;
    });
  }

  ngOnInit(): void {
    if (1) { }
  }

  onClickNew(): void {
    this.store.dispatch(loadCompAction({ mode: 'CREATE', id: null }));
    this.OnClickNew.emit('CREATE');
  }

  onClickSave(): void {
    this.OnClickSave.emit();
  }

  onClickBack(): void {
    this.store.dispatch(loadCompAction({ mode: 'VIEW', id: null }));
    this.OnClickBack.emit('VIEW');
  }

}
