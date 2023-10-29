import { AppUnspscState } from '../../shared/intrefaces/app.interface';
import { createReducer, on } from '@ngrx/store';
import { loadUnspscAction, loadedUnspscAction } from '../actions/app.actions';

export const initialState: AppUnspscState = { loading: false, state: false };

export const appUnspscReducer = createReducer(
  initialState,
  on(loadUnspscAction, (state) => {
    return { ...state };//cambiar estado a true
  }),
  on(loadedUnspscAction, (state) => {
    return { ...state };//cambiar estado a true
  }),
);
