import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Facturacion } from '@app/shared/common/classes';

@Component({
  selector: 'app-total',
  templateUrl: './app-total.component.html',
  styleUrls: ['./app-total.component.scss'],
})
export class AppTotalComponent extends Facturacion implements OnInit {
  @Input() locked = false;
  @Input() set currency(m: string) {
    if (m === 'PEN') {
      this.code_moneda = 'SOLES';
    } else {
      this.code_moneda = 'DOLARES';
    }
  }
  @Input() set dataSourse(d: any) {
    this.data = d;
    this.detalle = d?.detalle ?? [];
    if (d?.detalle === null) {
      this.detalle = [];
    }
    this.totalFactura(this.detalle, this.locked ? !this.locked : true);
  }

  @Output() OnCalc = new EventEmitter<any>();

  data: any;
  detalle: any[] = [];

  sub_total = 0;
  descuento = 0;
  subtotal_con_dscto = 0;
  igv = 0;
  op_exoneradas = 0;
  op_inafectas = 0;
  icbper = 0;
  total = 0;

  form: UntypedFormGroup = this.fb.group({
    sub_total: [],
    descuento: [],
    subtotal_con_dscto: [],
    igv: [],
    op_exoneradas: [],
    op_inafectas: [],
    icbper: [],
    total: [],
  });

  constructor(private fb: UntypedFormBuilder) {
    super();
  }

  ngOnInit(): void {
    if (this.g_total.g_total) {
      this.texto = this.CantidadEnLetra(this.g_total.g_total);
    }
  }


}
