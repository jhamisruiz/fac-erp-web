import { selectLoading, selectListItems } from './../../../../store/selectors/items.selectors';
import { Component, OnInit } from '@angular/core';
import { loadItems } from '@app/store/actions/items.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../../store/state/app.state';

@Component({
  selector: 'app-plan-cuentas',
  templateUrl: './plan-cuentas.component.html',
  styleUrls: ['./plan-cuentas.component.scss'],
})
export class PlanCuentasComponent implements OnInit {

  loading$: Observable<boolean> = new Observable();
  items$: Observable<any> = new Observable();

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    if (1) { }
    this.loading$ = this.store.select(selectLoading);
    this.store.dispatch(loadItems());

    this.items$ = this.store.select(selectListItems);
  }

}
