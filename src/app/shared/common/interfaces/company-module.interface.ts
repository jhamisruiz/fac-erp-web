
export interface CompanyModule {
  id: number;

  /** Titulo del modulo */
  label: string;

  /** Url del modulo */
  path?: string;

  /** Idenitificador unico del componente */
  uuid?: string;

  /** El modulo se muestra en el menú */
  visible?: boolean;

  /** Icono del modulo */
  icon?: string;

  // fixme: Eliminar propiedad contradictoria
  isModule?: boolean;

  // FIXME: Indica si es home module, borrar.
  home?: boolean;
}

export enum ComponentMode {
  CREATE = 'CREATE',
  EDIT = 'EDIT',
  VIEW = 'VIEW',
  DELETE = 'DELETE',
  PREVIEW = 'PREVIEW',
}

export type ComponentModeType = keyof typeof ComponentMode;
