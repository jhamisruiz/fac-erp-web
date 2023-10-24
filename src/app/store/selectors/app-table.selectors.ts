import { createSelector } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { AppTableState } from 'src/app/shared/intrefaces/app.interface';

export const selectDataFeature = (state: AppState): any => state.dataTable;

export const selectListDataTable = createSelector(
  selectDataFeature,
  (state: AppTableState) => state.dataTable,
);

export const selectLoadingDataTable = createSelector(
  selectDataFeature,
  (state: AppTableState): boolean => state.loading,
);
