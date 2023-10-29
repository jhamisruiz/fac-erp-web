import { createAction, props } from '@ngrx/store';
import { ComponentModeType } from '../../shared/common/interfaces/company-module.interface';

const loadComponte = '[Load C Form] Load App Component Form';
const loadedComponte = '[Loaded C Form] Loaded App Component Form Success';

const loadUnspsc = '[Load Unspsc] Load Data Unspsc';
const loadedUnspsc = '[Loaded Unspsc] Loaded Data Unspsc Success';

export const loadCompAction = createAction(
  loadComponte,
  props<{ formMode: ComponentModeType | null, id: number | null }>(),
);
export const loadedCompAction = createAction(
  loadedComponte,
  props<{ formMode: ComponentModeType | null, id: number | null }>(),
);

export const loadUnspscAction = createAction(
  loadComponte,
  props<{ state: boolean }>(),
);
export const loadedUnspscAction = createAction(
  loadedComponte,
  props<{ state: boolean }>(),
);
