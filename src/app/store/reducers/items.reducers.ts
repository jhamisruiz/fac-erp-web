import { createReducer, on } from '@ngrx/store';
import { loadItems, loadedItems } from '../actions/items.actions';
import { ItemsState } from 'src/app/shared/intrefaces/app.interface';

export const initialState: ItemsState = { loading: false, items: [] };

export const itemsReducer = createReducer(
  initialState,
  on(loadItems, (state) => {
    return { ...state, loading: true };//cambiar estado a true
  }),
  on(loadedItems, (state, { items }) => {
    return { ...state, loading: false, items };//cambiar estado a true
  }),
);
