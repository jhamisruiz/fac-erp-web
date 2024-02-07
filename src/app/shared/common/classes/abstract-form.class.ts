import { loadCompAction } from './../../../store/actions/app.actions';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { APP_KEY } from './../constants/app.constants';
import { AfterViewInit, Directive, Inject, Injector, Optional } from '@angular/core';
import { AbstractControl, UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { cloneDeep } from 'lodash-es';
import { Observable, Subject, Subscription } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { v4 } from 'uuid';
import { DOCUMENT_VERSION, ID_FIELD, TRANSACTION_UID_FIELD } from '../constants';
import { GetElements } from '../utils/dom/get-elements.util';
import { AbstractComponent } from './abstract-component.class';
import { HttpClient } from '@angular/common/http';
import { FormService } from '@app/shared/services/util-services/form.service';
import { selectLoadingCompForm } from '../../../store/selectors/app.selectors';
import { ComponentModeType } from '../interfaces';
import { STOREKEY } from '@app/config/keys.config';
declare const alertify: any;

/**
 * La clase AbstractForm se usa para el manejo automatico de los formurlarios
 * de un componente o otra clase.
 */
@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class AbstractForm extends AbstractComponent implements AfterViewInit {
  public static FORM_ID_KEY = 'id';

  /** Identificador del formulario */
  public formId!: string | number | undefined;

  /** ID de la transacción del formulario */
  public transactionId!: string;

  /** Version del document? */
  public documentVersion!: number; // TODO: la version del documento no se estable en esta parte.

  /** Ruta Ajax del manejador o CRUD del formulario */
  protected formControllerId!: string;

  /** Indica el valor de la sección actual dentro del componente */
  protected formTagId!: string;

  /** Servicio para contruir un formulario reactivo */
  protected fb: UntypedFormBuilder;

  protected alert = alertify;

  protected ok = false;
  protected resetForm = true;
  /** Defaut http client */
  protected httpClient: HttpClient;

  private fs: FormService;
  /**
   * Establece que que las actualizaciones de los valores del formulario
   * se hacen de forma parcial ( PATCH )
   */
  protected isPartialUpdate!: boolean;
  protected auto = false;
  protected onPatchValue = new Subject();
  /** Estructura del formulario */
  abstract form: UntypedFormGroup;
  originalForm: any;
  abstract fullPath: string;

  protected hashValues: any[] = [];

  private modDisable!: ComponentModeType;
  private postDisable = false;
  protected idempresa: 0;
  protected idsucursal: 0;
  protected paramsUniqueCode?: any;

  constructor(
    injector: Injector,
  ) {
    super(injector);
    this.fb = injector.get(UntypedFormBuilder);
    this.httpClient = injector.get(HttpClient);
    this.fs = new FormService(this.httpClient);
    //this.fs = injector.get(FormService);
    this.idempresa = this.persistence.get(STOREKEY.ID_EMPRESA);
    this.idsucursal = this.persistence.get(STOREKEY.ID_SUCURSAL);
    setTimeout(() => {
      if (!this.transactionId && this.isCreateMode) {
        this.transactionId = v4().toUpperCase();
      }

      this.loadComponentLabels();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      this.form?.valueChanges.subscribe(x => {
        if (this.form?.touched) {
          this.isValidated = false;
        }
      });
    }, 0);

    this.store.select(selectLoadingCompForm).subscribe((r) => {
      if (r.formMode) {
        this.changeMode(r.formMode);
        if (r[ID_FIELD]) {
          this.formId = r[ID_FIELD];
        }
      }
    });
  }

  /** Establece el id de la transacción del formulario actual */
  setTransactionId(transactionId: string): void {
    this.transactionId = transactionId;
  }


  submitForm(): void { }


  patchFormValue(data: any): void {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { __pristine = true, ...formdata } = { ...data };

    // Validación extra para sacar el valor de ID del cuerpo
    if (undefined === this.formId && formdata[ID_FIELD]) {
      this.formId = formdata[ID_FIELD];
    }

    // Validación extra para sacar el valor de TransactionId del cuerpo
    if (undefined === this.transactionId && formdata[TRANSACTION_UID_FIELD]) {
      this.transactionId = formdata[TRANSACTION_UID_FIELD];
    }

    // Validación extra para sacar el valor de version del cuerpo
    if (undefined === this.documentVersion && formdata[DOCUMENT_VERSION]) {
      this.documentVersion = formdata[DOCUMENT_VERSION];
    }

    this.deepPatch(formdata, this.form);
    this.onPatchValue.next(0);
    this.onPatchValue.complete();
  }

  validateForm(): void { }
  onDisable(mode: ComponentModeType): void {
    this.modDisable = mode;
  }

  getSubmitDisabled(): void {
    if (this.isEditMode && this.modDisable === 'EDIT') {
      this.postDisable = true;

      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        if (control) {
          control.disable(); // Esto desactivará todos los controles del FormGroup
        }
      });
    }
    if (this.isCreateMode && this.modDisable === 'CREATE') {
      this.postDisable = true;

      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        if (control) {
          control.disable(); // Esto desactivará todos los controles del FormGroup
        }
      });
    }
  }

  onSubmit(): void {
    this.getSubmitDisabled();

    if (this.isViewMode || this.postDisable) {
      return;
    }
    if (this.form?.valid) {
      return this.saveForm();
    }
    if (this.form?.valid === undefined) {
      return;
    }
    alertify.set('notifier', 'position', 'top-center');

    let inputInvalid = '';
    for (const name in this.form?.controls) {
      if (this.form?.get(name)?.invalid) {
        inputInvalid = `${inputInvalid} <li align="left"> <b> ${name} </b></li> `;
        //this.form?.get(name)?.markAsDirty();
      }
    }

    if (inputInvalid === '') {
      return this.saveForm();
    }

    const templateHtml = `
      <p>verifica los siguientes campos:</p>
      <div style="display:flex; justify-content: center;">
      <ol>${inputInvalid}</ol>
      </div>
      <br/>
    `;
    const nodes: HTMLElement[] = GetElements(this.element, '.ng-invalid');
    const [node] = nodes.filter(it => 'FORM' !== it.tagName);
    const [control] = GetElements(node, 'input,select,textarea');

    if (control) {
      control.focus();
    }

    alertify.alert('Formulario no es valido.', templateHtml);

    console.log('Formulario no es valido.', this.form, { aca: this.form?.getRawValue() }, this.form?.errors);
    // this.testFormValidate();
  }

  /**
   * Limpiar data vacía en los arreglos en el formulario cuando se crea un nuevo
   */
  arrayCleaner(): void {
    Object.keys(this.form?.controls).forEach((e: string) => {
      if (this.form?.controls[e] instanceof UntypedFormArray) {
        const formArray = this.form?.controls[e] as UntypedFormArray;
        formArray.clear();
      }
    });

  }

  /** Envia los campos del formulario para registrar */
  createForm(form: any): Observable<any> {
    const fm = this.hashValues?.length ? this.encrypt(form) : form;
    return this.fs.create(fm);
  }

  resForm(id: any): Observable<any> {
    return this.fs.get(id);
  }
  /** Envia los campos del formulario para reemplazar el contenido */
  replaceForm(form: any): Observable<any> {
    const fm = this.hashValues?.length ? this.encrypt(form) : form;
    return this.fs.update(this.formId, fm);
  }

  deleteForm(): Observable<any> {
    return this.fs.delete(this.formId);
  }

  getForm(d: any): void {
    if (undefined === this.formId && d[ID_FIELD]) {
      this.store.dispatch(loadCompAction({ formMode: 'EDIT', id: d[ID_FIELD] }));
    }
  }

  newGetForm(id: number | string): void {
    if (id) {
      this.fs.setControllerId(this.formControllerId ?? this.fullPath);
      this.changeMode('PREVIEW');
      this.saveForm();
    }
  }

  delForm(d: any): void {
    if (undefined === this.formId && d[ID_FIELD]) {
      this.changeMode('DELETE');
      this.formId = d[ID_FIELD];
      this.saveForm();
    }
  }

  saveForm(): void {
    this.auto = false;
    // Guardar formulario.
    if (this.form?.value?.fecha_update === null || this.form?.value?.fecha_update === undefined || this.form?.value?.fecha_update) {
      const currentDate = new Date();

      // Obtener los componentes de fecha y hora
      const year = currentDate.getFullYear();
      const month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Sumamos 1 ya que los meses comienzan desde 0
      const day = ('0' + currentDate.getDate()).slice(-2);
      const hours = ('0' + currentDate.getHours()).slice(-2);
      const minutes = ('0' + currentDate.getMinutes()).slice(-2);
      const seconds = ('0' + currentDate.getSeconds()).slice(-2);

      // Formatear la fecha y hora en el formato deseado
      const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      this.form?.patchValue({ fecha_update: formattedDateTime });
    }
    const value = this.form?.getRawValue();

    // Validación extra para sacar el valor de ID del cuerpo
    if (undefined === this.formId && value[ID_FIELD]) {
      this.formId = value[ID_FIELD];
    }
    const formMethod = this.isCreateMode ? this.createForm : (this.isEditMode ? this.replaceForm : (this.isDeleteMode ? this.deleteForm : this.resForm));

    console.log('saveForm...', { value, patch: this.getPatchValue(this.form?.controls, value) });

    formMethod.call(this, (this.isPreViewMode || this.isDeleteMode) && !this.isCreateMode ? this.formId : value)
      .pipe(
        takeUntil(this.destroyTrigger),
      )
      .subscribe({
        next: (data: any) => {
          this.rawData = data;
          if (data) {

            alertify.set('notifier', 'position', 'top-right');
            if (!this.isPreViewMode) {

              const message = data?.message ?? `OK: Datos guardados`;
              alertify.success(message);
            }

            if (data?.length) {
              alertify.error(`El formulario de angular no acepta arreglos  [${data?.length}]`);
            }

            if (this.isCreateMode || this.isPreViewMode) {
              if (data?.fecha_update) {
                const currentDate = new Date();

                // Obtener los componentes de fecha y hora
                const year = currentDate.getFullYear();
                const month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Sumamos 1 ya que los meses comienzan desde 0
                const day = ('0' + currentDate.getDate()).slice(-2);
                const hours = ('0' + currentDate.getHours()).slice(-2);
                const minutes = ('0' + currentDate.getMinutes()).slice(-2);
                const seconds = ('0' + currentDate.getSeconds()).slice(-2);

                // Formatear la fecha y hora en el formato deseado
                const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

                data.fecha_update = formattedDateTime;
              }

              this.form?.patchValue(data);
              this.getForm(data);
              this.changeMode('EDIT');
            }

            if (this.isEditMode) {
              if (data?.data?.id) {
                this.form?.patchValue(data?.data);
              }
            }

            if (this.isDeleteMode) {
              this.changeMode('VIEW');
              this.reset();
            }
            this.auto = true;
          }
          this.formId = undefined;
        },
        error: err => {
          console.log('error.. al guardar', err);
          //this.changeMode('VIEW');
          this.formId = undefined;
        },
        complete: () => {
          //this.reset();
        },
      });
  }

  reset(): void {
    if (this.resetForm) {
      this.form?.reset();
      const form: any = { ...this.originalForm };
      this.form?.patchValue(form);
      //this.OnbtnNew();//NOTE: para el boton nuevo desde el header
    }
  }

  codeValidator(value: string): Observable<any> {
    let params = { code: value };
    if (this.paramsUniqueCode) {
      params = { ...params, ...this.paramsUniqueCode };
    }
    return this.httpClient.get(`/${this.fullPath}-codigo`, {
      params: params,
    });
  }

  ngAfterViewInit(): void {
    this.originalForm = { ...this.form?.value };
    this.fs.setControllerId(this.formControllerId ?? this.fullPath);
  }

  public get hasFormChanged(): boolean {
    const changes = this.getPatchValue(this.form?.controls, this.form?.getRawValue());
    return !!changes;
  }

  private encrypt(d: any | any[]): any {
    const data = d;
    if (this.hashValues?.length) {
      this.hashValues.forEach((v) => {
        data[v] = APP_KEY + `${btoa(d[v])}`;
      });
    }
    return data;
  }

  private deepPatch(data: any, form: UntypedFormGroup): void {
    Object.keys(data || {}).forEach((objKey: string) => {
      const dataItemValue = data[objKey];
      const formItemControl = form?.controls[objKey];

      if (formItemControl instanceof UntypedFormArray/* || dataItemValue instanceof Array*/) {
        let formArray = formItemControl as UntypedFormArray;
        let formGroupStructure: any = formArray?.controls ? cloneDeep(formArray.controls[0]) : null;

        if (!(formArray instanceof UntypedFormArray)) {
          formArray = new UntypedFormArray([]);
        }
        formArray.clear();

        if (!formGroupStructure) {
          formGroupStructure = new UntypedFormGroup({});

          if (dataItemValue && dataItemValue.length) {
            const [firstDataElement] = dataItemValue;

            Object.keys(firstDataElement ?? {}).forEach((key: string) => {
              if (firstDataElement[key] instanceof Array) {
                formGroupStructure.addControl(key, new UntypedFormArray([]));
              } else {
                formGroupStructure.addControl(key, new UntypedFormControl(''));
              }
            });
          }
        }

        (dataItemValue || []).forEach((element: any) => {
          this.deepPatch(element, formGroupStructure);
          const copyStructure = cloneDeep(formGroupStructure);
          copyStructure.patchValue(element);
          formArray.push(cloneDeep(copyStructure));
        });
        return;
      }

      if (!formItemControl) {
        return;
      }

      formItemControl.patchValue(dataItemValue);
    });
  }

  private getPatchValue(controls: { [key: string]: AbstractControl }, value: any): any {
    const data = { ...value };
    for (const key of Object.keys(controls)) {
      const control = controls[key];
      if (control.pristine) {
        if (control instanceof UntypedFormGroup) {
          data[key] = this.getPatchValue(control.controls, data[key]);
          if (!data[key]) {
            delete data[key];
          }
        } else if (control instanceof UntypedFormArray) {
          const arrdata = control.controls.map((arrcontrol: any, index: number) => this.getPatchValue(arrcontrol.controls, data[key][index]));

          data[key] = arrdata.filter(Boolean);

          if (!data[key].length) {
            delete data[key];
          }

        } else {
          delete data[key];
        }
      }
    }
    return !Object.keys(data).length ? void 0 : data;
  }


}
