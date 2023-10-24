import { createSelector } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { ItemsState } from 'src/app/shared/intrefaces/app.interface';


export const selectItemsFeature = (state: AppState): any => state.items;

export const selectListItems = createSelector(
  selectItemsFeature,
  (state: ItemsState) => state.items,
);

export const selectLoading = createSelector(
  selectItemsFeature,
  (state: ItemsState): boolean => state.loading,
);
