import { createSelector } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { AppCompFormState, AppUnspscState } from 'src/app/shared/intrefaces/app.interface';

export const selectFormFeature = (state: AppState): any => state.formMode;
export const selectUnspscFeature = (state: AppState): any => state.unspsc;

export const selectCompForm = createSelector(
  selectFormFeature,
  (state: AppCompFormState) => state.formMode,
);

export const selectLoadingCompForm = createSelector(
  selectFormFeature,
  (state: AppCompFormState): AppCompFormState => state,
);


export const selectUnspscForm = createSelector(
  selectUnspscFeature,
  (state: AppUnspscState) => state.codigo,
);

export const selectLoadingUnspsc = createSelector(
  selectUnspscFeature,
  (state: AppUnspscState): boolean => state.loading,
);
