import { createAction, props } from '@ngrx/store';
import { ComponentModeType } from '../../shared/common/interfaces/company-module.interface';

const loadComponte = '[Load C Form] Load App Component Form';
const loadedComponte = '[Loaded C Form] Loaded App Component Form Success';

export const loadCompAction = createAction(
  loadComponte,
  props<{ mode: ComponentModeType | null, id: number | null }>(),
);
export const loadedCompAction = createAction(
  loadedComponte,
  props<{ mode: ComponentModeType | null, id: number | null }>(),
);
