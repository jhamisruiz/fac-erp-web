import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UnspscService } from './unspsc.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/state/app.state';
import { selectLoadingUnspsc } from '@app/store/selectors/app.selectors';
import { loadedUnspscAction } from '@app/store/actions/app.actions';

export interface UNSPSC {
  codigo: string | null;
  descripcion: string | null;
}
interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
@Component({
  selector: 'app-unspsc',
  templateUrl: './unspsc.component.html',
  styleUrls: ['./unspsc.component.scss'],
})
export class UnspscComponent implements OnInit {

  @Input() set InputCodigo(c: string | null) {
    if (c) {
      this.codigo = c;
    }
  }
  @Output() NgModelResponse = new EventEmitter<UNSPSC>();

  loading$: Observable<any> = new Observable();
  visible: boolean = true;
  layoutMode!: string | null;

  codigo: string | null | undefined;
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
  constructor(private store: Store<AppState>, private sv: UnspscService) { }

  ngOnInit(): void {
    this.layoutMode = document.documentElement.getAttribute('data-layout-mode');
    this.getSegmentos();
  }

  twoWords(s: string | null | undefined, n: number): string {
    if (s) {
      return (s).substring(0, n);
    }
    return '';
  }

  getSegmentos(): void {
    this.sv.getSegmentos().subscribe((r: UNSPSC[] | null) => {
      if (r) {
        this.segmentos = r;
        this.setSegmentos();
      }
    });
  }
  setSegmentos(): void {
    if (this.codigo) {
      this.loading$ = this.store.select(selectLoadingUnspsc);
      const d = (this.codigo).substring(0, 2) + '000000';
      this.segmento = this.segmentos.find(vd => vd.codigo === d);
      this.getSegmentoToFamilia();
    }
  }

  getSegmentoToFamilia(): void {
    if (this.segmento?.codigo) {
      this.sv.getFamilias(this.segmento?.codigo).subscribe((r: UNSPSC[] | null) => {
        if (r) {
          this.familias = r;
          this.setFamilia();
        }
      });
    }
  }
  setFamilia() {
    if (this.codigo) {
      const d = (this.codigo).substring(0, 4) + '0000';
      this.familia = this.familias.find(vd => vd.codigo === d);
      this.getFamiliaToClase();
    }
  }

  getFamiliaToClase(): void {
    if (this.familia?.codigo) {
      this.sv.getClases(this.familia?.codigo).subscribe((r: UNSPSC[] | null) => {
        if (r) {
          this.clases = r;
          this.setClase();
        }
      });
    }
  }

  setClase() {
    if (this.codigo) {
      const d = (this.codigo).substring(0, 6) + '00';
      this.clase = this.clases.find(vd => vd.codigo === d);
      this.getClaseToProd();
    }
  }

  getClaseToProd(): void {
    if (this.clase?.codigo) {
      this.sv.getProductos(this.clase?.codigo, null).subscribe((r: UNSPSC[] | null) => {
        if (r) {
          this.productos = r;
          this.setProducto();
        }
      });
    }
  }

  setProducto() {
    if (this.codigo) {
      this.producto = this.productos.find(vd => vd.codigo === this.codigo);
      this.store.dispatch(loadedUnspscAction({ state: false }));
    }
  }
  getProducto(): void {
    this.NgModelResponse.emit(this.producto);
  }

  suggestProds(e: AutoCompleteCompleteEvent): void {
    if (!this.clase?.codigo) {
      this.sv.getProductos('', e?.query).subscribe((r: UNSPSC[] | null) => {
        if (r) {
          this.productos = r;
        }
      });
    }
  }

  getSuggstProducto(e: any, a: any): void {
    if (e?.codigo) {
      this.codigo = e?.codigo;
      this.setSegmentos()
    }
  }

}
