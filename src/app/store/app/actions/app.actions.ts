import { ComponentModeType } from '@app/shared/common/interfaces';
import { createAction, props } from '@ngrx/store';
import { AppTypes } from '@store/app.descriptions';



export const loadCompAction = createAction(
  AppTypes.loadComponte,
  props<{ formMode: ComponentModeType | null, id: number | null }>(),
);
export const loadedCompAction = createAction(
  AppTypes.loadedComponte,
  props<{ formMode: ComponentModeType | null, id: number | null }>(),
);

export const loadUnspscAction = createAction(
  AppTypes.loadUnspsc,
);
export const loadedUnspscAction = createAction(
  AppTypes.loadedUnspsc,
  props<{ codigo: string | null }>(),
);
