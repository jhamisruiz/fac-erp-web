
import { Component, Injector, OnInit } from '@angular/core';
import { UntypedFormGroup, Validators } from '@angular/forms';
import { AbstractDocument } from '@app/shared/common/classes';
import { AppTable } from '@app/shared/components/app-table/app-table.interface';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
})
export class ProductoComponent extends AbstractDocument implements OnInit {
  fullPath = '/producto';
  data: any[] = [];
  headers: AppTable[] = [{
    field: 'id',
    label: 'id',
    visible: false,
  },
  {
    field: 'nombre',
    label: 'nombre',
  },
  {
    field: 'descripcion',
    label: 'descripcion',
  },
  {
    field: 'id_categoria',
    label: 'categoria',
    optionLabel: 'nombre',
    optionValue: 'id',
    type: 'select',
    placeholder: 'Select. categoria',
    url: '/categoria-buscar',
    Labels: ['nombre'],
  },
  {
    field: 'idunidad_medida',
    label: 'unidad medida',
    optionLabel: 'nombre',
    optionValue: 'id',
    type: 'select',
    placeholder: 'Select. U. Medida',
    url: '/producto-unidad-medida-buscar',
    Labels: ['codigo', 'descripcion'],
    separador: ' - ',
  },
  {
    field: 'cantidad',
    label: 'cantidad',
  },
  {
    field: 'id_marca',
    label: 'marca',
    visible: false,
  },
  ];

  form: UntypedFormGroup = this.fb.group(
    {
      id: [],
      codigo_unspsc: ['10121805'],
      codigo: [, [Validators.required]],
      nombre: [, [Validators.required]],
      descripcion: [],
      id_categoria: [, [Validators.required]],
      idunidad_medida: [, [Validators.required]],
      cantidad: [, [Validators.required]],
      id_sucursal: [{ value: this.idsucursal, disabled: true }, [Validators.required]],
      id_marca: [],
      fecha_creacion: [new Date().toISOString().slice(0, 10)],
      habilitado: [true],
      detalle: [[]],
    },
  );

  constructor(injector: Injector) { super(injector); }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
