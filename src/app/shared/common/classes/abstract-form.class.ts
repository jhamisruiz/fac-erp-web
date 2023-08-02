/* eslint-disable @typescript-eslint/no-unused-vars */
import { Directive, Inject, Injector, Optional } from '@angular/core';
import { AbstractControl, UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { cloneDeep } from 'lodash-es';
import { Observable, Subject, Subscription } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { v4 } from 'uuid';
import { DOCUMENT_VERSION, ID_FIELD, TRANSACTION_UID_FIELD } from '../constants';
import { GetElements } from '../utils/dom/get-elements.util';
import { AbstractComponent, ComponentMode } from './abstract-component.class';
import { SweetAlertService } from '@app/shared/services/util-services/sweet-alert.service';
import { HttpClient } from '@angular/common/http';
declare const alertify: any;
/**
 * La clase AbstractForm se usa para el manejo automatico de los formurlarios
 * de un componente o otra clase.
 */
@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class AbstractForm extends AbstractComponent {
  public static FORM_ID_KEY = 'id';

  /** Identificador del formulario */
  public formId!: string | number;

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
  /**
   * Establece que que las actualizaciones de los valores del formulario
   * se hacen de forma parcial ( PATCH )
   */
  protected isPartialUpdate!: boolean;

  protected onPatchValue = new Subject();
  private altr: SweetAlertService;
  /** Estructura del formulario */
  abstract form: UntypedFormGroup;
  originalForm: any;
  abstract fullPath: string;

  constructor(
    injector: Injector,
  ) {
    super(injector);
    this.fb = injector.get(UntypedFormBuilder);
    this.httpClient = injector.get(HttpClient);

    this.altr = new SweetAlertService();
    setTimeout(() => {
      if (!this.transactionId && this.isCreateMode) {
        this.transactionId = v4().toUpperCase();
      }

      this.loadComponentLabels();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      this.form?.valueChanges.subscribe(x => {
        if (this.form.touched) {
          this.isValidated = false;
        }
      });
    }, 0);
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

  onSubmit(): void {
    if (this.form.valid) {
      return this.saveForm();
    }
    if (this.form?.valid === undefined) {
      return;
    }
    alertify.set('notifier', 'position', 'top-center');

    let inputInvalid = '';
    for (const name in this.form.controls) {
      if (this.form.get(name)?.invalid) {
        inputInvalid = `${inputInvalid} <li align="left"> <b> ${name} </b></li> `;
        //this.form.get(name)?.markAsDirty();
      }
    }

    if (inputInvalid === '') {
      return this.saveForm();
    }

    const templateHtml = `
      <h3>Formulario no valido</h3>
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

    this.altr.warn('Formulario no valido', '', {
      showCancelButton: false,
      showConfirmButton: false,
      showCloseButton: true,
      html: templateHtml,
      // confirmButtonText: 'Salir',
      // confirmButtonClass: 'btn btn-warning'
    },
    );
    console.log('Formulario no es valido.', this.form, { aca: this.form.getRawValue() }, this.form.errors);
    // this.testFormValidate();
  }

  /**
   * Limpiar data vacía en los arreglos en el formulario cuando se crea un nuevo
   */
  arrayCleaner(): void {
    Object.keys(this.form.controls).forEach((e: string) => {
      if (this.form.controls[e] instanceof UntypedFormArray) {
        const formArray = this.form.controls[e] as UntypedFormArray;
        formArray.clear();
      }
    });
  }

  saveForm(): void {
    // Guardar formulario.
    const value = this.form.getRawValue();
    console.log('saveForm', { patch: this.getPatchValue(this.form.controls, value), value });
    if (this.fullPath) { }

    this.httpClient.post(this.fullPath, value)
      .pipe(
        takeUntil(this.destroyTrigger),
      )
      .subscribe({
        next: (data: any) => {

          this.rawData = data;

          alertify.set('notifier', 'position', 'top-right');

          if (data) {
            alertify.success(`OK: Datos guardados`);

            this.reset();

          }

          //}
        },
        error: err => {
          console.log('error.. al guardar', err);
        },
        complete: () => {
          //this.reset();
        },
      });
  }
  reset(): void {
    if (this.resetForm) {
      this.form.reset();
      const form: any = { ...this.originalForm };
      this.form.patchValue(form);
      //this.OnbtnNew();//NOTE: para el boton nuevo desde el header
    }
  }

  public get hasFormChanged(): boolean {
    const changes = this.getPatchValue(this.form.controls, this.form.getRawValue());
    return !!changes;
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
