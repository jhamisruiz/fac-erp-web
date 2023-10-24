import { ComponentModeType } from '../common/interfaces/company-module.interface';
export interface ItemModel {
  name: string;
  price: number;
  image: string;
}

export interface ItemsState {
  loading: boolean, items: ReadonlyArray<ItemModel>
}

export interface AppTableState {
  loading: boolean, dataTable: ReadonlyArray<any>
}

export interface AppCompFormState {
  loading: boolean, mode: Readonly<ComponentModeType | null>, id: Readonly<number | null>
}
