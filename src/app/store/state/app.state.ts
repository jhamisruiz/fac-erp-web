import { ActionReducerMap } from '@ngrx/store';
import { AppCompFormState, AppTableState, ItemsState } from 'src/app/shared/intrefaces/app.interface';
import { itemsReducer } from '../reducers/items.reducers';
import { appTableReducer } from '../reducers/app-table.reducers';
import { appCompFormReducer } from '../reducers/app.reducer';

export interface AppState {
  items: ItemsState;
  dataTable: AppTableState;
  mode: AppCompFormState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  items: itemsReducer,
  dataTable: appTableReducer,
  mode: appCompFormReducer,
}

