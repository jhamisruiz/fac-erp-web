import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

export interface UNSPSC {
  codigo: string;
  descripcion: string;
}
@Component({
  selector: 'app-unspsc',
  templateUrl: './unspsc.component.html',
  styleUrls: ['./unspsc.component.scss'],
})
export class UnspscComponent implements OnInit {

  layoutMode!: string | null;

  data: UNSPSC[] = [];
  segmentos: UNSPSC[] = [];
  segmento: any;

  familias: UNSPSC[] = [];
  familia: any;

  clases: UNSPSC[] = [];
  clase: any;

  productos: UNSPSC[] = [];
  producto: any;

  searchTerm = '';
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.layoutMode = document.documentElement.getAttribute('data-layout-mode');
    this.getCategorias();
  }

  twoWords(s: string, n: number): string {
    if (s) {
      return (s).substring(0, n) + '-';
    }
    return '';
  }

  getCategorias(): void {
    const jsonFile = './assets/json/app.json';
    this.http.get(jsonFile).subscribe((r: any) => {
      this.data = r.data;
      this.segmentos = this.data.filter(i => i.codigo.endsWith('000000'));
    });
  }

  getSegmentoToFamilia(): void {
    if (this.segmento?.codigo) {
      const f = (this.segmento.codigo).substring(0, 2);
      this.familias = this.data.filter(i => i.codigo.startsWith(f) && i.codigo.endsWith('0000') && parseInt(i.codigo) > this.segmento.codigo);
    }
  }
  getFamiliaToClase(): void {
    if (this.familia?.codigo) {
      const f = (this.familia.codigo).substring(0, 4);
      this.clases = this.data.filter(i => i.codigo.startsWith(f) && i.codigo.endsWith('00') && parseInt(i.codigo) > this.familia.codigo);
    }
  }

  getClaseToProd(): void {
    if (this.clase?.codigo) {
      const f = (this.clase.codigo).substring(0, 6);
      this.productos = this.data.filter(i => i.codigo.startsWith(f) && parseInt(i.codigo) > this.clase.codigo);
    }
  }

  getProducto(): void {

  }

  filterData(): void {
    const filteredData = this.data.filter(item => {
      return item.descripcion.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }
}
