import { createAction, props } from '@ngrx/store';
import { ItemModel } from '../../shared/intrefaces/app.interface';

export const loadItems = createAction(
  '[Items List] Load Items',
);

export const loadedItems = createAction(
  '[Items List] Loaded Success',
  props<{ items: ItemModel[] }>(),
);
