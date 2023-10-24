import { createAction, props } from '@ngrx/store';

const loadTAble = '[Table List] Load Data Table';
const loadedTAble = '[Table List] Loaded Data Table Success';

export const loadTAbleAction = createAction(
  loadTAble,
);
export const loadedTAbleAction = createAction(
  loadedTAble,
  props<{ dataTable: any[] }>(),
);
