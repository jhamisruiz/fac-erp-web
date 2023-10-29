import { ActionReducerMap } from '@ngrx/store';
import { AppCompFormState, AppTableState, AppUnspscState, ItemsState } from 'src/app/shared/intrefaces/app.interface';
import { itemsReducer } from '../reducers/items.reducers';
import { appTableReducer } from '../reducers/app-table.reducers';
import { appCompFormReducer } from '../reducers/app.reducer';
import { appUnspscReducer } from '../reducers/app.unspsc';

export interface AppState {
  items: ItemsState;
  dataTable: AppTableState;
  formMode: AppCompFormState;
  unspsc: AppUnspscState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  items: itemsReducer,
  dataTable: appTableReducer,
  formMode: appCompFormReducer,
  unspsc: appUnspscReducer,
}

