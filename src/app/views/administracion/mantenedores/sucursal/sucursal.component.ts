import { UntypedFormArray, UntypedFormGroup, Validators } from '@angular/forms';
import { AbstractDocument } from '@app/shared/common/classes';
import { Component, OnInit, Injector } from '@angular/core';
import { UniqueDoc } from '../../../../shared/validators/unique-document';
import { AppTable } from '../../../../shared/components/app-table/app-table.interface';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.scss'],
})

export class SucursalComponent extends AbstractDocument implements OnInit {
  fullPath = '/sucursal';
  data: any[] = [];
  headers: AppTable[] = [
    {
      field: 'id',
      label: 'id',
      visible: false,
    },
    {
      field: 'codigo',
      label: 'codigo',
    },
    {
      field: 'nombre',
      label: 'nombre',
    },
    {
      field: 'direccion',
      label: 'direccion',
    },
    {
      field: 'habilitado',
      label: 'habilitado',
      estado: true,
    },
  ];

  form: UntypedFormGroup = this.fb.group(
    {
      id: [],
      id_empresa: ['', [Validators.required]],
      codigo: [{ value: null, disabled: this.isEditMode }, [Validators.required],
      Validators.composeAsync([UniqueDoc(this.codeValidator.bind(this))])],
      nombre: ['', [Validators.required]],
      ubigeo: ['', [Validators.required]],
      direccion: [],
      telefono: [],
      email: [],
      fecha_creacion: [new Date().toISOString().slice(0, 10)],
      habilitado: [true],
      detalle: [[]],
    },
  );

  headers_sucursal_doc: AppTable[] = [
    {
      field: 'id',
      label: 'id',
      visible: false,
    },
    {
      field: 'id_sucursal',
      label: 'id_sucursal',
      visible: false,
    },
    {
      field: 'iddocumento_electronico',
      label: 'tipo documento',
      optionLabel: 'nombre',
      optionValue: 'id',
      type: 'select',
      placeholder: 'Select. documento.',
      url: '/facturacion-documento-buscar',
      isTemplete: true,
      Labels: ['codigo', 'nombre'],
      separador: ' - ',
      required: true,
      unique: true,
    },
    {
      field: 'serie',
      label: 'serie',
      toUpperCase: true,
    },
    {
      field: 'correlativo',
      label: 'correlativo',
      type: 'number',
      minFractionDigits: 0,
    },
    {
      field: 'fecha_creacion',
      label: 'fecha_creacion',
      value: new Date().toISOString().slice(0, 10),
      visible: false,
    },
    {
      field: 'habilitado',
      label: 'habilitado',
      value: true,
      visible: false,
    },
  ];
  comumentos: any[] = [];
  constructor(injector: Injector) { super(injector); }

  ngOnInit(): void {
    super.ngOnInit();
  }

  getUbigeo(e: any): void {
    this.form.patchValue({
      departamento: e.departamento,
      provincia: e.provincia,
      distrito: e.distrito,
      ubigeo: e.ubigeo,
    });
  }

  updateDataResponse(e: any[]): void {

    const fieldName = 'detalle';
    if (e !== null) {
      const f = this.form.get([fieldName]) as UntypedFormArray;
      f.patchValue(e);
    }
  }
}
