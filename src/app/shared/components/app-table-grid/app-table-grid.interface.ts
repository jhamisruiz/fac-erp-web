export interface AppTableGrid {
  field: string;
  label: string;
  thStyle?: string;
  fieldname?: string;
  obj_Value?: string;
  labelClass?: string;
  id?: string;
  type?: 'text' | 'textArea' | 'number' | 'select' | 'simpleSelect' | 'multiple' | 'suggest' | 'date' | 'time' | 'file' | 'inputMask' | 'button';
  textAreaRows?: number;
  required?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  placeholder?: string;
  value?: any;
  data?: any;
  unique?: boolean;
  visible?: boolean;
  isObject?: boolean;
  idObject?: boolean;
  isArray?: boolean;
  imageP?: boolean;
  date?: boolean;
  dateFormat?: string;
  mindate?: number | any;
  maxdate?: number | any;
  object?: any;
  array?: any;
  optLabel?: string;
  codigo?: string;
  ofield?: string;
  optionLabel?: string;
  optionCode?: string;
  optionValue?: string;
  dataKey?: string;
  class?: string;
  taRows?: number;
  errStyle?: string;
  money?: string;
  estado?: boolean;
  estadoDocs?: any[];
  linkDownload?: string;
  button?: any;
  icon?: string;
  btnClass?: string;
  btnBoolClass?: string;
  btnBoolIcon?: string;
  btnBool?: true | false;
  center?: true;
  celClick?: any;
  minWidth?: string;
  habilitar?: boolean;
  url?: string;
  textBreak?: boolean;
  title?: string;
  Print?: string;
  parentsVals?: Array<ParentVal>;
  showClear?: boolean;
  filter?: boolean;
  keyData?: string;
  urlParent?: string;
  useUrl?: boolean;
  delPath?: string;
  updatePath?: string;
  enablePath?: string;
  queryParent?: any;
  querySParams?: any;
  querySPEnable?: any;
  isTemplete?: boolean;
  Labels?: Array<string>;
  separador?: string;
  toUpperCase?: boolean;
  //INPUT NUMBER
  inputMin?: number;
  minFractionDigits?: number;
  inputMax?: number;
  step?: number;
  prefix?: 'S/' | '$' | string;
  toModalVisible?: boolean;
  showButtons?: boolean;
  //form
  colClass?: string;
}

export interface ParentVal {
  field: string;
  parentField: string;
}

