import { CompanyComponent, CompanyModule } from '@app/shared/common/interfaces';

export interface CompanyStoreState {
  id: number;
  name: string;
  address?: string;
  typeId: number; // rubro?
  parameters: any[];
  settings?: any;
  modules: CompanyModule[];
  components: {
    [key: string]: CompanyComponent[];
  };
}

export const initialCompanyState: CompanyStoreState = {
  id: 106,
  name: 'Nisira Systems SAC',
  address: 'Trujillo',
  typeId: 1,
  parameters: [],
  modules: [],
  components: {},
};
