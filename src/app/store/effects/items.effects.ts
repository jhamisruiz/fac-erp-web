
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { AppConfigService } from '../../shared/services/config.service';
import { Action } from '@ngrx/store';

@Injectable()
export class ItemsEffects {

  loadItems$ = createEffect(() => this.actions$.pipe(
    ofType('[Items List] Load Items'),
    exhaustMap(() => this.sv.getDataApi2()
      .pipe(map((items) => ({ type: '[Items List] Loaded Success', items })),
        catchError(() => EMPTY)),
    ),
  ),
  );
  constructor(
    private actions$: Actions<Action>,
    private sv: AppConfigService,
  ) { }

}
