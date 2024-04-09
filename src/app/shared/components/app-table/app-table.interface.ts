export interface AppTable {
  field: string;
  label: string;
  type?: 'text' | 'number' | 'inputMask' | 'select' | 'suggest' | 'dateTime' | 'date' | 'time' | 'habilitado' | 'button';
  visible?: false;
  ///
  data?: any;
  fieldname?: string;
  optionLabel?: string;
  optionCode?: string;
  optionValue?: string;
  dataKey?: string;

  id?: string;
  isObject?: boolean;
  isArray?: boolean;
  dateFormat?: string;
  class?: string;
  money?: string;
  linkDownload?: string;
  icon?: string;
  center?: true;
  minWidth?: string;
  url?: string;
  useUrl?: boolean;
  localUrl?: true,
  Labels?: Array<string>;
  separador?: string;
  toUpperCase?: boolean;
  //INPUT NUMBER
  min?: number;
  minFractionDigits?: number;
  max?: number;
  step?: number;
  prefix?: 'S/' | '$' | string;

  //buton
  button?: any;
  btnClass?: string;
  btnBoolClass?: string;
  btnBoolIcon?: string;
  btnBool?: true | false;
}

export interface ParentVal {
  field: string;
  parentField: string;
}
