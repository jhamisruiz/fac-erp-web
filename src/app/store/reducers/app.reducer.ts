import { AppCompFormState } from './../../shared/intrefaces/app.interface';
import { createReducer, on } from '@ngrx/store';
import { loadCompAction, loadedCompAction } from '../actions/app.actions';

export const initialState: AppCompFormState = { loading: false, mode: null, id: null };

export const appCompFormReducer = createReducer(
  initialState,
  on(loadCompAction, (state, { mode, id }) => {
    return { ...state, loading: true, mode, id };//cambiar estado a true
  }),
  on(loadedCompAction, (state, { mode, id }) => {
    return { ...state, loading: false, mode, id };//cambiar estado a true
  }),
);
