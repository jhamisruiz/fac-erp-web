

export class Facturacion {

  g_total = {
    g_sub_total: 0,
    g_descuento: 0,
    g_subtotal_con_dscto: 0,
    g_igv: 0,
    g_op_exoneradas: 0,
    g_op_inafectas: 0,
    g_icbper: 0,
    g_total: 0,
  };
  public igv_porcentaje = 0.18;

  constructor() { }
  transform(value: any): any {
    if (value === null) {
      return 0;
    }
    const val = value.toString().replace(',', ':');
    const val2 = val.toString().replace('.', ',');
    const val3 = val2.toString().replace(':', '.');
    //value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return val3;
  }
  public formatMoney(value: any): any {
    return this.transform(value);
  }

  public calculaFactura(d: any, f: boolean): void {
    if (f) {
      if (d?.obj_id_producto) {
        const obj = d?.obj_id_producto;
        if (obj?.cantidad) {
          d.cantidad_actual = (obj?.cantidad ?? 0) - (d?.cantidad ?? 0);
        }
      }
      let descuento = 0.00;
      let op_gravadas = 0.00;
      let op_exoneradas = 0.00;
      let op_inafectas = 0.00;
      let icbper = 0.00;
      let igv = 0.0;

      if (d?.tipo_afectacion === 10) {
        op_gravadas = (d?.valor_unitario ?? 0) * (d?.cantidad ?? 0);
        d.sub_total = op_gravadas;
        descuento = (op_gravadas) - (d?.descuento ?? 0);
      }

      if (d?.tipo_afectacion === 20) {
        op_exoneradas = (d?.valor_unitario ?? 0) * (d?.cantidad ?? 0);
        d.sub_total = op_exoneradas;
        descuento = (op_exoneradas) - (d?.descuento ?? 0);
        op_exoneradas = descuento;
      }

      if (d?.tipo_afectacion === 30) {
        op_inafectas = (d?.valor_unitario ?? 0) * (d?.cantidad ?? 0);
        d.sub_total = op_inafectas;
        descuento = (op_inafectas) - (d?.descuento ?? 0);
        op_inafectas = descuento;
      }

      if (d?.afecto_icbper === 1) {
        icbper = Number(d?.factor_icbper ?? 0) * (d?.cantidad ?? 0);
      }
      d.op_exoneradas = op_exoneradas.toFixed(2);
      d.op_inafectas = op_inafectas.toFixed(2);

      const total_descuento = descuento.toFixed(2);
      d.subtotal_con_dscto = Number(total_descuento);

      igv = d?.tipo_afectacion === 10 ? (Number(total_descuento) * this.igv_porcentaje) : 0.00;

      d.igv_porcentaje = this.igv_porcentaje;
      d.igv = igv.toFixed(2);
      d.icbper = icbper;
      d.total = Number(total_descuento) + igv + icbper;
    }
  }

  public totalFactura(d: Array<any>, f: boolean): void {
    if (f) {
      this.rest();
      let g_sub_total = 0.0;
      let g_descuento = 0.0;
      let g_subtotal_con_dscto = 0.0;
      let g_igv = 0.0;
      let g_op_exoneradas = 0.0;
      let g_op_inafectas = 0.0;
      let g_icbper = 0.0;
      let g_total = 0.0; /**/

      if (d?.length) {
        d.forEach(v => {
          let sub_total = 0.00;
          let descuento = 0.00;
          let op_gravadas = 0.00;
          let op_exoneradas = 0.00;
          let op_inafectas = 0.00;
          let icbper = 0.00;
          let igv = 0.0;
          let total = 0.0;

          if (v?.tipo_afectacion === 10) {
            op_gravadas = (v?.valor_unitario ?? 0) * (v?.cantidad ?? 0);
            sub_total = op_gravadas;
            descuento = (op_gravadas) - (v?.descuento ?? 0);
          }

          if (v?.tipo_afectacion === 20) {
            op_exoneradas = (v?.valor_unitario ?? 0) * (v?.cantidad ?? 0);
            sub_total = op_exoneradas;
            descuento = (op_exoneradas) - (v?.descuento ?? 0);
            op_exoneradas = descuento;
          }

          if (v?.tipo_afectacion === 30) {
            op_inafectas = (v?.valor_unitario ?? 0) * (v?.cantidad ?? 0);
            sub_total = op_inafectas;
            descuento = (op_inafectas) - (v?.descuento ?? 0);
            op_inafectas = descuento;
          }

          if (v?.afecto_icbper === 1) {
            icbper = Number(v?.factor_icbper ?? 0) * (v?.cantidad ?? 0);
          }

          const total_descuento = descuento.toFixed(2);

          igv = v?.tipo_afectacion === 10 ? (Number(total_descuento) * this.igv_porcentaje) : 0.00;

          total = Number(total_descuento) + igv + icbper;

          g_sub_total = g_sub_total + sub_total;
          g_descuento = g_descuento + v?.descuento;
          g_subtotal_con_dscto = g_subtotal_con_dscto + Number(total_descuento);
          g_igv = g_igv + Number(igv.toFixed(2));
          g_op_exoneradas = g_op_exoneradas + Number(op_exoneradas.toFixed(2));
          g_op_inafectas = g_op_inafectas + Number(op_inafectas.toFixed(2));
          g_icbper = g_icbper + icbper;
          g_total = g_total + total;
        });
        this.g_total = {
          g_sub_total: g_sub_total,
          g_descuento: g_descuento,
          g_subtotal_con_dscto: g_subtotal_con_dscto,
          g_igv: g_igv,
          g_op_exoneradas: g_op_exoneradas,
          g_op_inafectas: g_op_inafectas,
          g_icbper: g_icbper,
          g_total: g_total,
        };
      }
    }
  }

  rest(): void {
    this.g_total = {
      g_sub_total: 0,
      g_descuento: 0,
      g_subtotal_con_dscto: 0,
      g_igv: 0,
      g_op_exoneradas: 0,
      g_op_inafectas: 0,
      g_icbper: 0,
      g_total: 0,
    };
  }
}
