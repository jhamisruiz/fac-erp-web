export interface AppTable {
  field: string;
  label: string;
  thStyle?: string;
  //suggest
  /**
   * @param fieldname contiene el nombre del parametro que almacenara el objeto
   * @require `obj_Value` si es type=`select` requiere del parametro `obj_Value`
   *  */
  fieldname?: string;
  /**
   * @param obj_Value es requerido si usa `fieldname` almacena el nombre del valor parametro del objeto que comprara
   *  */
  obj_Value?: string;
  labelClass?: string;
  id?: string;
  type?: string;
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
  mindate?: number;
  maxdate?: number;
  object?: any;
  array?: any;
  join?: number;
  olabel?: string;
  codigo?: string;
  ofield?: string;
  optionLabel?: string;
  optionCode?: string;
  optionValue?: string;
  dataKey?: string;
  class?: string;
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
  inners?: any[];
  binary?: any[];
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
  query?: any;
  fake?: boolean;
  isTemplete?: boolean;
  Labels?: Array<string>;
  separador?: string;
  toUpperCase?: boolean;
  //INPUT NUMBER
  min?: number;
  minFractionDigits?: number;
  max?: number;
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
