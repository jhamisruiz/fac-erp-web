import { createSelector } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { AppCompFormState } from 'src/app/shared/intrefaces/app.interface';

export const selectFormFeature = (state: AppState): any => state.mode;

export const selectCompForm = createSelector(
  selectFormFeature,
  (state: AppCompFormState) => state.mode,
);

export const selectLoadingCompForm = createSelector(
  selectFormFeature,
  (state: AppCompFormState): AppCompFormState => state,
);
