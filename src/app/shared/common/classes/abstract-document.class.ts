/* eslint-disable @typescript-eslint/no-unused-vars */
import { TRANSACTION_UID_FIELD } from './../constants/app.constants';
import {
  ChangeDetectorRef,
  Directive, forwardRef, InjectFlags, InjectionToken, Injector, OnDestroy, OnInit,
  Provider,
} from '@angular/core';
import { UntypedFormArray, UntypedFormGroup, FormGroupDirective } from '@angular/forms';


import { FormService } from '@app/shared/services/util-services/form.service';
import { cloneDeep } from 'lodash-es';
import { takeUntil } from 'rxjs/operators';
import { NsMetadata } from '../decorators';
import { NsDocumentOptions } from '../decorators/document.decorator';
import { ComponentMode, ComponentModeType, Modetype, tabId, WTab } from '../interfaces';
import { ComponentStatus } from './abstract-component.class';
import { AbstractForm } from './abstract-form.class';
import { WintabOptions } from './wintabs.class';
import { GetMetaOptions } from '../utils/get-meta.util';

export const DOCUMENT_DATA = new InjectionToken('_it:document.data');
export const DOCUMENT_TAB = new InjectionToken('_it:document.tab');
export const DOCUMENT_STATE = new InjectionToken('_it:document.state');
export const DOCUMENT_CONFIG = new InjectionToken<NsDocumentOptions>('_it:document.config');

@Directive()
@NsMetadata({ isDocument: true })
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class AbstractDocument extends AbstractForm implements OnInit, OnDestroy {

  /** Establece el ID de la lista en un documento */
  public tableComponentId: string;

  /** ID del documento para la gestion de ventanas */
  public documentId: string;

  /** Titulo del documento */
  public documentTitle!: string;

  public statusSequence = [];
  public currentSequence!: number;

  /** Identifica si es un movimiento. */
  public isMovement: boolean;
  public isMaintainer: boolean;
  public isReport!: boolean;
  public isProcess!: boolean;


  /** Intancia de el almacenmiento local */
  protected isWindowTab = false;
  protected options: NsDocumentOptions = {};
  // protected permission: PermissionService;

  private cdr: ChangeDetectorRef;

  public dataGrupo: any[] = [
    {
      id: 1,
      nombre: 'Ingeniero',
      codigo: 'ING',
    },
    {
      id: 2,
      nombre: 'Maestro',
      sexo: 'MST',
    },
    {
      id: 3,
      nombre: 'Maestro Oficial',
      sexo: 'MOF',
    },
    {
      id: 4,
      nombre: 'Peon',
      sexo: 'PN',
    },
    {
      id: 5,
      nombre: 'Topógrafos',
      sexo: 'TPG',
    },
    {
      id: 6,
      nombre: 'Arquitecto',
      sexo: 'ARQ',
    },
    {
      id: 7,
      nombre: 'Administrador',
      sexo: 'ADM',
    },
    {
      id: 9,
      nombre: 'OTROS',
      sexo: 'OTR',
    },
  ];

  public moneda: any[] = [
    {
      codigo: 'PEN',
      nombre: '(S/) Nuevo Sol o Sol',
    }, {
      codigo: 'USD',
      nombre: '($) US Dollar',
    }];

  public tipoAfectacion: any[] = [
    { codigo: 10, descripcion: 'Gravado - Operación Onerosa' },
    { codigo: 11, descripcion: 'Gravado – Retiro por premio' },
    { codigo: 12, descripcion: 'Gravado – Retiro por donación' },
    { codigo: 13, descripcion: 'Gravado – Retiro' },
    { codigo: 14, descripcion: 'Gravado – Retiro por publicidad' },
    { codigo: 15, descripcion: 'Gravado – Bonificaciones' },
    { codigo: 16, descripcion: 'Gravado – Retiro por entrega a trabajadores' },
    { codigo: 17, descripcion: 'Gravado – IVAP' },
    { codigo: 20, descripcion: 'Exonerado - Operación Onerosa' },
    { codigo: 21, descripcion: 'Exonerado – Transferencia Gratuita' },
    { codigo: 30, descripcion: 'Inafecto - Operación Onerosa' },
    { codigo: 31, descripcion: 'Inafecto – Retiro por Bonificación' },
    { codigo: 32, descripcion: 'Inafecto – Retiro' },
    { codigo: 33, descripcion: 'Inafecto – Retiro por Muestras Médicas' },
    { codigo: 34, descripcion: 'Inafecto - Retiro por Convenio Colectivo' },
    { codigo: 35, descripcion: 'Inafecto – Retiro por premio' },
    { codigo: 36, descripcion: 'Inafecto - Retiro por publicidad' },
    { codigo: 40, descripcion: 'Exportación de bienes o servicios' }];

  constructor(injector: Injector) {
    super(injector);

    this.rawState = injector.get<any>(DOCUMENT_STATE, null, InjectFlags.Optional);

    // fixme: No deberia volver a jalar...
    this.rawData = injector.get<any>(DOCUMENT_DATA, null, InjectFlags.Optional);

    this.cdr = injector.get(ChangeDetectorRef);
    // this.permission =  injector.get(PermissionService);

    this.options = injector.get<NsDocumentOptions>(DOCUMENT_CONFIG, {}, InjectFlags.Optional);
    this.isMovement = !!this.options.isMovement;
    this.isMaintainer = !!this.options.isMaintainer;
    this.tableComponentId = this.options.tableComponentId ?? '';
    this.componentId = this.options.viewComponentId ?? '';
    this.isPartialUpdate = !!this.options.partialUpdate;

    this.documentId = this.options?.id ?? ''; // String(tab?.id ?? '');
  }

  ngOnInit(): void {
    // llamar obligatoriamente al metodo del padre.
    super.ngOnInit();
    //this.isViewMode = true;
    // Escucha los estados de sincronización del componente.
    this.fetching$
      .pipe(
        takeUntil(this.destroyTrigger),
      )
      .subscribe(data => {

        // Combine local state
        this.patchFormValue({
          ...this.rawState,
          ...data,
        });

      });

    this.onInitDocument();

    if (this.formSection) {

      // Register default tools

      this.onChangeStatus.subscribe(status => {
        if (status === ComponentStatus.FOCUSED) {
        } else if (status === ComponentStatus.DISABLED) {
        }

      });
    }

    if (this.isEditMode && this.formId) {
      this.newGetForm(this.formId);
    }
    if (this.isViewMode === undefined) {
      this.changeMode('VIEW');
    }

  }

  updateToolbar(): void {

  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public setWindowTab(tab: WTab): void {

    this.isWindowTab = true;
  }

  public setOptions(value: NsDocumentOptions): void {
    this.options = value;
  }

  compare(a: any, b: any, key: string): number {
    if (a[key] < b[key]) {
      return -1;
    }
    if (a[key] > b[key]) {
      return 1;
    }
    return 0;
  }

  public get modeType(): Modetype {
    return {
      isViewMode: this.isViewMode,
      isPreViewMode: this.isPreViewMode,
      isEditMode: this.isEditMode,
      isCreateMode: this.isCreateMode,
      isDeleteMode: this.isDeleteMode,
      formValid: this.form?.valid,
    };
  }

  public get tableSection(): boolean {
    return !this.isWindowTab;
  }

  public get formSection(): boolean {
    return this.isWindowTab;
  }

  changeMode(mode: ComponentModeType): void {
    //
    if (mode === 'CREATE') {
      this.reset();
    }
    super.changeMode(mode);
  }

  onInitDocument(): void {
    this.onChangeMode.pipe(
      takeUntil(this.destroyTrigger),
    ).subscribe(mode => {
      //this.updateTab(this.formId, { mode });
    });

  }

  addEditTab(data: any, id?: tabId, options?: WintabOptions): void {
    this.openWinTab(ComponentMode.EDIT, this.documentId, { data, id, ...options });
  }

  addViewTab(data: any, id?: tabId, options?: WintabOptions): void {
    console.log(ComponentMode.VIEW, this.documentId, { data, id, ...options });
    this.openWinTab(ComponentMode.VIEW, this.documentId, { data, id, ...options });
  }

  addNewTab(data?: any, id?: tabId, options?: WintabOptions): void {
    console.log({ add: 1 });
    this.openWinTab(ComponentMode.CREATE, this.documentId, { data, id, ...options });
  }

  addPreviewTab(data: any, id?: tabId, options?: WintabOptions): void {
    this.openWinTab(ComponentMode.PREVIEW, this.documentId, { data, id, ...options });
  }

  updateTab(id: tabId, tab: Partial<WTab>): void {
    this.updateWinTab(this.documentId, id, tab);
  }

  // TODO: Hacer uno que permita borrar y crear nuevo

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // deleteRow(e?: Record<string, unknown>): void {
  //   this.deleteForm().subscribe(() => {
  //     this.closeWinTab(this.documentId, this.formId);
  //   });
  // }


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  saveCustomLabels(data: { [key: string]: string }): void {
    // return this.fs.saveCustomLabels(this.componentId, data);
  }

  clearLabel(): void {
    // return this.fs.clearLabel(this.formId);
  }

  // updateDocumentSequence(idEstado: number | string): Observable<any> {
  //   return this.fs.updateDocumentSequence(this.formId, Number(idEstado), this.componentId);
  // }

  /**
   * Añadir un elemento a un Form Array
   */
  addFormArrayItem(formKey: string | any[], method: UntypedFormGroup, index?: number): void {
    const items: UntypedFormArray = this.form.get(formKey) as UntypedFormArray;
    if (!items) {
      return;
    }

    items.removeAt(index ?? items.length);
    items.insert(index ?? items.length, cloneDeep(method));
  }
}

export function ProviderFunc(frmClass: any): Provider[] {
  return [
    FormGroupDirective,
    FormService,
    {
      provide: DOCUMENT_CONFIG,
      useValue: forwardRef(() => GetMetaOptions(frmClass, true)),
    },
    {
      provide: AbstractDocument,
      useExisting: frmClass,
    },
  ];
}

export const DocumentProvider = ProviderFunc;
