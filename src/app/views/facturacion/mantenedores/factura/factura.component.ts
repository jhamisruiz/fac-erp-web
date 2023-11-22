import { Component, Injector, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormGroup, Validators } from '@angular/forms';
import { AbstractDocument } from '@app/shared/common/classes';
import { AppTable } from '@app/shared/components/app-table/app-table.interface';
import { AppServicesService } from '@app/shared/services/app-services/app-services.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss'],
})
export class FacturaComponent extends AbstractDocument implements OnInit {
  fullPath = '/factura';
  data: any[] = [];
  activeEmpresa = false;
  activeCliente = false;
  activeDetalle = false;

  headers: AppTable[] = [{
    field: 'id',
    label: 'id',
    visible: false,
  },
  {
    field: 'factura',
    label: 'factura',
  },
  {
    field: 'pdf',
    label: 'pdf',
    type: 'button',
    btnClass: 'danger p-0 pt-1',
    icon: 'bxs-file-pdf text-white',
  },
  {
    field: 'xml',
    label: 'xml',
    type: 'button',
    btnClass: 'secondary p-0 pt-1',
    icon: 'ri-file-code-line text-white',
  },
  {
    field: 'cdr',
    label: 'cdr',
    type: 'button',
    btnClass: 'warning p-0 pt-1',
    icon: 'ri-file-zip-fill text-white',
  },
  {
    field: 'sunat',
    label: 'sunat',
    type: 'button',
    btnClass: ' btn-light border border-success p-0 pt-1',
    icon: 'bx bxs-check-circle text-success',
  },
  {
    field: 'correo',
    label: 'correo',
    type: 'button',
    btnClass: ' btn-light border border-danger p-0 pt-1',
    icon: 'bx bx-mail-send text-danger',
  },
  ];

  form: UntypedFormGroup = this.fb.group(
    {
      id: [],
      emisor: this.fb.group({
        id_empresa: ['', [Validators.required]],
        id_sucursal: ['', [Validators.required]],
        tipo_documento: ['6', [Validators.required]],
        numero_documento: [{ value: null, disabled: true }],
        razon_social: [{ value: null, disabled: true }],
        nombre_comercial: [{ value: null, disabled: true }],
        departamento: [{ value: null, disabled: false }],
        provincia: [{ value: null, disabled: false }],
        distrito: [{ value: null, disabled: false }],
        direccion: [{ value: null, disabled: false }],
        ubigeo: [{ value: null, disabled: false }],
        usuario_emisor: [{ value: null, disabled: false }],
        clave_emisor: [{ value: null, disabled: false }],
        clave_certificado: [{ value: null, disabled: false }],
      }),
      cliente: this.fb.group({
        tipo_documento: ['6', [Validators.required]],
        numero_documento: ['20441204451', [Validators.required]],
        razon_social: [, [Validators.required]],
        direccion: [, [Validators.required]],
      }),
      tipo_comprobante: ['01', [Validators.required]],
      serie: [{ value: null, disabled: false }, [Validators.required]],
      correlativo: [{ value: null, disabled: false }, [Validators.required]],
      codigo_moneda: ['PEN', [Validators.required]],
      fecha_emision: [, [Validators.required]],
      fecha_vencimiento: [],
      fecha_creacion: [new Date().toISOString().slice(0, 10)],
      habilitado: [true],
      detalle: [[]],
      sub_total: [],
      descuento: [],
      subtotal_con_dscto: [],
      igv: [],
      op_exoneradas: [],
      op_inafectas: [],
      icbper: [],
      total: [],
    },
  );
  parents = [
    { field: 'idunidad_medida', parentField: 'idunidad_medida' },
    { field: 'codigo', parentField: 'codigo' },
    { field: 'codigo_unspsc', parentField: 'codigo_unspsc' },
    { field: 'cantidad', parentField: 'cantidad_actual' },
    { field: 'descuento', parentField: 'descuento' },
    { field: 'precio', parentField: 'valor_unitario' },
    { field: 'tipo_afectacion', parentField: 'tipo_afectacion' },//10,20,30,..
    { field: 'factor_icbper', parentField: 'factor_icbper' },//..., 0.40, 0.50
    { field: 'afecto_icbper', parentField: 'afecto_icbper' },//0 or 1
  ];
  headers_detalle: AppTable[] = [
    {
      field: 'id', label: 'id',
      visible: false,
      toModalVisible: false,
    },
    {
      field: 'id_producto',
      label: 'producto',
      type: 'suggest',
      optionValue: 'id',
      url: '/producto-buscar',
      olabel: 'nombre',
      codigo: 'codigo',
      parentsVals: this.parents,
      required: true,
    },
    {
      field: 'codigo', label: 'codigo',
      toUpperCase: true,
      visible: false,
      toModalVisible: false,
    }, {
      field: 'codigo_unspsc', label: 'codigo_unspsc',
      toUpperCase: true,
      visible: false,
      toModalVisible: false,
    },
    {
      field: 'idunidad_medida',
      label: 'unidad medida',
      optionLabel: 'descripcion',
      optionValue: 'id',
      type: 'select',
      placeholder: 'Select. U.M.',
      url: '/producto-unidad-medida-buscar',
      Labels: ['codigo', 'descripcion'],
      parentsVals: [{ field: 'codigo', parentField: 'unidad_medida' }],
      isTemplete: true,
      separador: ' - ',
      required: true,
    },
    { field: 'unidad_medida', label: 'unidad_medida', visible: false, toModalVisible: false },
    {
      field: 'tipo_afectacion', label: 't. afectacion',
      optionLabel: 'descripcion',
      optionValue: 'codigo',
      type: 'select',
      placeholder: 'Select. T. afectacion',
      data: this.tipoAfectacion,
      Labels: ['codigo', 'descripcion'],
      isTemplete: true,
      required: true,
      min: 0,
    },
    {
      field: 'afecto_icbper', label: 'afecto_icbper',
      type: 'number',
      visible: false,
      toModalVisible: false,
    },
    {
      field: 'cantidad_actual', label: 'cantidad actual',
      type: 'number',
      minFractionDigits: 2,
      colClass: 'col-xxl-2 col-md-3',
      visible: false,
      disabled: true,
    },
    {
      field: 'cantidad', label: 'cantidad',
      type: 'number',
      showButtons: true,
      minFractionDigits: 2,
      colClass: 'col-xxl-2 col-md-3',
      required: true,
      value: 1,
      min: 0,
    },
    {
      field: 'valor_unitario', label: 'p. unitario',
      prefix: 'S/',
      type: 'number',
      showButtons: true,
      colClass: 'col-xxl-2 col-md-3',
      required: true,

    },
    {
      field: 'sub_total', label: 'sub total',
      min: 0, prefix: 'S/',
      type: 'number',
      toModalVisible: false,
      disabled: true,
    },
    {
      field: 'descuento', label: 'descuento',
      min: 0, prefix: 'S/',
      type: 'number',
      showButtons: true,
      toModalVisible: false,
    },
    {
      field: 'subtotal_con_dscto', label: 'sub total descuento',
      min: 0, prefix: 'S/',
      type: 'number',
      toModalVisible: false,
      minFractionDigits: 2,
      visible: false,
    },
    { field: 'igv_porcentaje', label: 'igv_porcentaje', visible: false, toModalVisible: false },
    {
      field: 'igv', label: 'igv',
      min: 0, prefix: 'S/',
      type: 'number',
      toModalVisible: false,
    },
    {
      field: 'factor_icbper', label: 'F. icbper',
      prefix: 'S/', min: 0.1, max: 0.5, step: 0.1,
      type: 'number', visible: false,
      showButtons: true,
      colClass: 'col-xxl-2 col-md-2',
    },
    {
      field: 'icbper', label: 'icbper',
      type: 'number', visible: false,
      toModalVisible: false,
    },
    {
      field: 'op_exoneradas', label: 'op_exoneradas',
      type: 'number', visible: false,
      toModalVisible: false,
    },
    {
      field: 'op_inafectas', label: 'op_inafectas',
      type: 'number', visible: false,
      toModalVisible: false,
    },
    {
      field: 'total', label: 'p. total',
      prefix: 'S/', min: 0,
      type: 'number',
      toModalVisible: false,
      required: true,
    },
  ];
  pathSucursal = '/sucursal-empresa?start=0&length=10&search=&order=asc&cod=0&cod=0';

  constructor(injector: Injector, private sv: AppServicesService,
  ) { super(injector); }

  ngOnInit(): void {
    super.ngOnInit();
    //this.onDisable('EDIT');
    this.form.patchValue({
      detalle: [
        {
          id: null,
          obj_id_producto: {
            codigo: 'prod-2',
            nombre: 'pelota',
          },
          id_producto: 2,
          codigo: 'PROD-2',
          codigo_unspsc: '10191509',
          idunidad_medida: 58,
          unidad_medida: 'NIU',
          tipo_afectacion: 10,
          afecto_icbper: 0,
          cantidad_actual: 64,
          cantidad: 2,
          valor_unitario: 110,
          sub_total: 220,
          descuento: 20,
          subtotal_con_dscto: 200,
          igv_porcentaje: '0.18',
          igv: '36.00',
          factor_icbper: '0.00',
          icbper: 0,
          op_exoneradas: '0.00',
          op_inafectas: '0.00',
          total: 238,
          index: 0,
        },
        {
          id: null,
          obj_id_producto: {
            codigo: 'prod-8',
            nombre: 'Libro',
          },
          id_producto: 8,
          codigo: 'PROD-8',
          codigo_unspsc: '10191509',
          idunidad_medida: 58,
          unidad_medida: 'NIU',
          tipo_afectacion: 20,
          afecto_icbper: 0,
          cantidad_actual: 299,
          cantidad: 1,
          valor_unitario: 17,
          sub_total: 17,
          descuento: 7,
          subtotal_con_dscto: 10,
          igv_porcentaje: '0.18',
          igv: '0.00',
          factor_icbper: '0.00',
          icbper: 0,
          op_exoneradas: '10.00',
          op_inafectas: '0.00',
          total: 10,
          index: 1,
        },
        {
          id: null,
          obj_id_producto: {
            codigo: 'prod-11',
            nombre: 'platano',
          },
          id_producto: 11,
          codigo: 'PROD-11',
          codigo_unspsc: '10191509',
          idunidad_medida: 58,
          unidad_medida: 'NIU',
          tipo_afectacion: 30,
          afecto_icbper: 0,
          cantidad_actual: 9,
          cantidad: 1,
          valor_unitario: 16,
          sub_total: 16,
          descuento: 6,
          subtotal_con_dscto: 10,
          igv_porcentaje: '0.18',
          igv: '0.00',
          factor_icbper: '0.00',
          icbper: 0,
          op_exoneradas: '0.00',
          op_inafectas: '10.00',
          total: 10,
          index: 2,
        },
        {
          id: null,
          obj_id_producto: {
            codigo: 'prod-17',
            nombre: 'Bolsa Plastica',
          },
          id_producto: 17,
          codigo: 'PROD-17',
          codigo_unspsc: '10191509',
          idunidad_medida: 58,
          unidad_medida: 'NIU',
          tipo_afectacion: 10,
          afecto_icbper: 1,
          cantidad_actual: 29,
          cantidad: 1,
          valor_unitario: 2.5,
          sub_total: 2.5,
          descuento: 0.5,
          subtotal_con_dscto: 2,
          igv_porcentaje: '0.18',
          igv: '0.36',
          factor_icbper: '0.40',
          icbper: 0.40,
          op_exoneradas: '0.00',
          op_inafectas: '0.00',
          total: 2.76,
          index: 3,
        }],
    });

  }
  updateDataResponse(e: any[]): void {
    const fieldName = 'detalle';
    if (e !== null) {
      const f = this.form.get([fieldName]) as UntypedFormArray;
      f.patchValue(e);
    }
  }

  onInput(e: any): void {
    if (e?.length === 11) {
      this.sv.getDniRuc({ 'dni_ruc': e }).subscribe((r: any) => {
        const fieldName = 'cliente';
        if (r) {
          const f = this.form.get([fieldName]) as UntypedFormGroup;
          f.patchValue({
            razon_social: r?.nombre,
            direccion: r?.direccion,
          });
        }
      });
    }
  }
  OnChange(e: any): void {
    const fieldName = 'emisor';
    if (e) {
      const f = this.form.get([fieldName]) as UntypedFormGroup;
      f.patchValue({
        nombre_comercial: e?.nombre_comercial,
        razon_social: e?.razon_social,
        direccion: e?.direccion,
        numero_documento: e?.numero_documento,
        departamento: e?.departamento,
        provincia: e?.provincia,
        distrito: e?.distrito,
        ubigeo: e?.ubigeo,
        usuario_emisor: e?.usuario_emisor,
        clave_emisor: e?.clave_emisor,
        clave_certificado: e?.clave_certificado,
      });
    }
  }

  selectChange(e: any): void {
    const code = e > 0 ? e : 0;
    this.pathSucursal = `/sucursal-empresa?start=0&length=10&search=&order=asc&cod=${code}&doc=1`;
  }

  OnChangeSucursal(e: any): void {
    if (e?.detalle) {
      const d = e?.detalle;
      this.form.patchValue({
        serie: d.serie,
        correlativo: d.correlativo,
      });
    }
  }
}
