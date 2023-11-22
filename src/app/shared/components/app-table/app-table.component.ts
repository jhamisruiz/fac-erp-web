/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Message } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import * as moment from 'moment';
import { AppTable, ParentVal } from './app-table.interface';
import { AppTableService } from './app-table.service';
import { Table } from 'primeng/table';
import * as _ from 'lodash';
import { Observable, Subscription } from 'rxjs';
import { NUMEROS_NOMBRES } from '@app/shared/common/constants';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/state/app.state';
import { selectLoadingDataTable } from '../../../store/selectors/app-table.selectors';
import { loadTAbleAction, loadedTAbleAction } from '../../../store/actions/app-table.actions';
import { Facturacion } from '@app/shared/common/classes';

export class Items {
  edit?: boolean;
  delete?: boolean;
  config?: boolean;
}

@Component({
  selector: 'app-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.scss'],
  providers: [ConfirmationService, MessageService],
})


export class AppTableComponent extends Facturacion implements OnInit, OnDestroy {
  numeroNombres: string[] = NUMEROS_NOMBRES;

  @ViewChild('dt') tb!: Table;
  @Input() newRow: any;
  @Input() csv?: boolean;
  @Input() exel?: boolean;
  @Input() isFProd = false;
  @Input() search = false;
  @Input() crud = false;
  @Input() paginator = true;
  @Input() rowIndex = true;

  @Input() isViewTab = true;
  @Input() selectionMode = 'single';
  @Input() pageRowInit = 10;
  @Input() tableCheckbox = false;

  @Input() addStart = false;
  @Input() crudStart = false;

  @Input() sort = false;
  @Input() btnsMin = false;
  @Input() contextDisabled = false;

  @Input() btnEnable?: boolean;
  @Input() btnNew?: boolean;
  @Input() btnEdit?: boolean;
  @Input() btnDelete?: boolean;
  @Input() btnConfig?: boolean;
  @Input() iconBtnConfig?: string;

  @Input() btnHand?: boolean;

  @Input() btnSelect?: boolean;

  @Input() tableName?: string;
  @Input() path?: string;

  //modal
  @Input() modalFormName?: string;
  @Input() isFacturacion: boolean = false;

  ////////
  @Input() menuContext = true;//?: boolean;
  items: MenuItem[] = [];
  menuItem: Items = {};

  @Input() set headers(hds: AppTable[]) {
    hds.forEach((v, i) => {
      if (v?.type === 'suggest') {
        if (!v?.fieldname) {
          hds[i].fieldname = `obj_${v.field}`;
        }
      }
    });

    this.headerstab = hds;
    this.selectSG();
  }
  @Input() set dataSourse(d: any[]) {
    this.isediting = false;
    this.getIsEditRow(false);
    this.data = d ?? [];
    this.data.forEach((v, i) => {
      this.data[i].index = i;
    });
    if (d === null) {
      this.data = [];
    }
  }

  @Input() set currentPath(url: string) {
    if (url) {
      this.currentSPath = url;
      this.getData(url);
    }
  }

  @Input() set inputSearch(s: string) {
    if (s) {
      this.tb.filterGlobal(s, 'contains');
    }
  }
  @Input() set daysMont(d: number) {
    if (d > 27) {
      this.currentMData.length = 0;
      this.currentMData = [];
      const data: any[] = [];
      for (let dia = 0; dia < d; dia++) {

        data.push({
          name: this.numeroNombres[dia],
          id: dia + 1,
        });
      }
      this.currentMData = data;
      this.daysEachMont = false;
    }
  }

  @Input() set refresh(d: boolean | undefined) {
    if (d === true) {
      this.getData(this.path ?? this.currentSPath ?? null);
    }
  }

  @Input() set edit(d: boolean) {
    this.getIsEditRow(d);
  }
  @Input() modalForm = false;
  @Input() locked = false;

  @Input() isDelete = true;
  @Input() idsuggest!: number;

  @Output() OnSelectFiltro = new EventEmitter<any>();
  @Output() OnRefresh = new EventEmitter<any>();

  @Output() OnNew = new EventEmitter<any>();
  @Output() OnEdit = new EventEmitter<any>();
  @Output() OnHand = new EventEmitter<any>();

  @Output() OnEnable = new EventEmitter<any>();
  @Output() OnSelect = new EventEmitter<any>();
  @Output() OnRowSelect = new EventEmitter<any>();
  @Output() OnDelete = new EventEmitter<any>();
  @Output() OnConfig = new EventEmitter<any>();
  @Output() OnRowSave = new EventEmitter<any>();

  @Output() inEdition = new EventEmitter<any>();
  @Output() delResponse = new EventEmitter<any>();
  @Output() OnChangeData = new EventEmitter<any[] | null>();
  @Output() dataResponse = new EventEmitter<any>();

  @Output() OnTable = new EventEmitter<any>();
  toastPosition: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' | 'center' = 'top-right';
  daysEachMont = true;
  currentMData: any[] = [];
  currentSPath?: string;
  filterGlobal = '';
  data: any[] = [];
  headerstab: AppTable[] = [];

  //modal
  modal: any;
  dataModal: any;
  copyModal: any;
  displayModal = false;
  isModalEdit = false;
  isModalNew = false;
  isModalView = false;

  nombrecuadro = 'Imagenes';
  images: any[] = [];
  exportColumns: any[] = [];
  host = '';
  zip = '';
  imagenes: any[] = [];
  msgs: Message[] = [];
  editing = false;

  inedit: any;
  isediting = false;
  isaddrow = false;
  required = false;
  cloneRow: any = {};
  currentEdit: any = [];
  dataDeleted: any[] = [];
  filterSelect: any[] = [];
  rowSelect = false;
  rowDisabledSelect = false;
  selectedIndex: any[] = [];
  rowData: any;
  loading = false;
  loading$: Observable<any> = new Observable();
  totalLoading = false;
  date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

  selectedData: any | any[] = [];

  ///-----
  fprod: any[] = [{ name: 'Empieza', code: 1 }, { name: 'Contiene', code: 2 }];
  filtroprod = 1;

  constructor(
    private store: Store<AppState>,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private sv: AppTableService,
  ) {
    super();
    this.sv.refreshData.subscribe((r) => {
    });
    this.sv.isRefresh$.subscribe(r => {
      if (r) {
        this.OnRefresh.emit();
        this.getData(this.path ?? this.currentSPath ?? null);
      }
    });
  }

  ngOnInit(): void {
    this.isediting = false;
    this.getIsEditRow(false);
    this.primengConfig.ripple = true;

    if (this.path) {
      this.getData(this.path);
    }
    this.menuItem = {
      edit: this.btnEdit,
      delete: this.btnDelete,
      config: this.btnConfig,
    };
    this.items = [
      {
        label: 'Editar', icon: 'text-success pi pi-fw pi-pencil',
        styleClass: `text-success ${this.optionItm('edit', this.menuItem) ? '' : 'd-none'}`,
        command: (e): void => this.editR(this.rowData),
      },
      {
        label: 'Config', icon: `text-primary pi pi-fw ${this.iconBtnConfig ? this.iconBtnConfig : 'pi-cog'}`,
        styleClass: `text-primary ${this.optionItm('config', this.menuItem) ? '' : 'd-none'}`,
        command: (e): void => this.configR(this.rowData),
      },
      {
        label: 'Eliminar', icon: 'text-danger pi pi-fw pi-trash',
        styleClass: `text-danger ${this.optionItm('delete', this.menuItem) ? '' : 'd-none'}`,
        command: (e): void => this.deleteR(this.rowData, this.tableName ?? '', this.headerstab),
      },
    ];
    this.getSelects();
  }
  modelMode(m: 'EDIT' | 'NEW' | 'VIEW'): void {
    this.isModalEdit = m === 'EDIT' ? true : false;
    this.isModalNew = m === 'NEW' ? true : false;
    this.isModalView = m === 'VIEW' ? true : false;
  }
  getIsEditRow(e: boolean): void {
    this.editing = e;
    this.sv.setChangeState(e);
  }

  getAsistencia(d: any[]): void {
    console.log('getAsistencia', d);
  }
  onContextMenu(e: any): void {
    this.rowData = e;
    this.contextDisabled = false;
    if (e?.idEstado === 2) {
      this.contextDisabled = true;
    }
  }

  optionItm(n: string, i: Items): boolean {

    if (i?.edit && n === 'edit') {
      return true;
    }
    if (i?.config && n === 'config') {
      return true;
    }
    if (i?.delete && n === 'delete') {
      return true;
    }
    return false;
  }


  selectCheckbox(): void {
    this.OnChangeData.emit(this.selectedIndex ?? []);
  }
  selectFiltro(e: any): void {
    this.OnSelectFiltro.emit(e);
  }
  asd(): string {
    return 'IdSucursal';
  }
  onRowSelect(e: any): void {
    this.OnRowSelect.emit(e?.data ?? {});
    this.rowSelect = true;
    this.rowDisabledSelect = false;
    if (!this.editing) {
      this.rowData = {};
      this.rowData = e?.data ?? {};
    }
    const d = e?.data ?? {};
    if (d?.idEstado === 2) {
      this.rowSelect = false;
    }
  }
  onRowUnselect(e: any): void {
    this.rowSelect = false;
    if (!this.selectedIndex?.length) {
      this.selectedIndex = [];
      this.selectedIndex.length = 0;
    }
  }

  selectSG(): any {
    const modal: any = {};
    this.headerstab.forEach((v, i) => {
      if (this.headerstab[i].type === 'suggest') {
        this.headerstab[i].data = v?.data ? v?.data : [];
      }
      if ((v?.type === 'select' && v?.url && v?.useUrl === undefined) || (v?.type === 'simpleSelect' && v?.url && v?.useUrl === undefined)) {
        const url = `${v.url}?start=0&length=62&search=&order=asc`;// + d[pnt.queryParent[0]];
        this.sv.select(url).subscribe((r: any) => {
          const data: any[] = r ?? [];
          v.data = data;
        });
      }
      if (v?.type === 'multiple' && v?.url) {
        this.sv.select(v?.url).subscribe((r: any) => {
          const data: any[] = r ?? [];
          v.data = data;
        });
      }
      if (v?.type === 'suggest') {
        this.getSugget(null, v, v?.url, v?.fake ?? false);
      }
      //para el modal
      if (v.fieldname) {
        modal[v.fieldname] = null;
      }
      modal[v.field] = v?.value ?? null;
    });

    modal.index = 0;
    this.modal = modal;
    this.copyModal = _.cloneDeep(modal);
  }

  filterData(e: any, h: any, url: any, fake: boolean): void {
    this.getSugget(e.query ?? null, h, url, fake);
  }

  getSugget(data: any, h: any, url: any, fake: boolean): void {
    this.sv.suggest(data, url, fake).subscribe((r: any) => {
      //const data: any[] = r ?? [];
      this.filterSelect = r?.length ? r : (r?.length ? r : []);
      h.data = r?.length ? r : (r?.length ? r : []);
    });
  }

  change(e: any, d: any, f: any, p: Array<ParentVal>): void {
    if (!e.target.value) {
      d[f] = null;
      if (p?.length) {
        p.forEach((v, i) => {
          d[v.parentField] = null;
        });
      }
    }
  }
  changeData(): void {
    this.OnChangeData.emit(this.data);
    this.calculaFactura(this.modal, this.locked ? !this.locked : this.isFacturacion);
  }

  getSelects(): void {
    const d: any[] = this.data;
    this.headerstab.forEach((h, l) => {
      if (h?.useUrl === false) {

        this.data.forEach((v, i) => {
          const url = `${h.url}` + v[h.queryParent[0]];
          this.sv.select(url).subscribe((r: any) => {
            const data: any[] = r ?? [];
            const k = h?.keyData ?? 'data';
            v[k] = data;
          });
        });
      }

      if (d?.length && h?.type === 'suggest') {
        //AGREGA UN PBJETO DEL FINDER AL FILDNAME DE LA ROW
        d.forEach((v, i) => {
          const obj = h?.data.find((vh: any) => vh?.[h?.optionValue ?? ''] === v[h?.field]);
          if (obj) {
            d[i][h?.fieldname ?? ''] = obj;
          }
        });
      }
    });

  }

  selected(e: any, d: any, f: any, p: Array<ParentVal>, h: any): void {

    //select
    const id = e?.value > 0 ? e?.value : 0;
    const data: any[] = h?.data ?? [];
    if (data?.length) {
      const doc = data.find((n) => n.id === id);
      if (doc) {
        if (p?.length) {
          p.forEach((v, i) => {
            d[v.parentField] = doc[v.field];
            const obj = this.headerstab.find((vh: any) => vh?.field === v.parentField);
            if (obj) {
              this.errorStyle(d, obj, d[obj?.field], obj?.required ?? false, obj?.parentsVals ?? []);
            }
          });
        }
      }
    }
  }

  selectedItemSgst(e: any, d: any, field: any, oVal: any, p: Array<ParentVal>): void {
    //parents
    if (e?.id || e[oVal]) {
      d[field] = e[oVal];
      if (p?.length) {
        p.forEach((v, i) => {
          if (v.field) {
            d[v.parentField] = e[v.field];
            const obj = this.headerstab.find((vh: any) => vh?.field === v.parentField);
            if (obj) {
              if (obj?.type === 'select') {
                if (obj?.parentsVals?.length) {
                  //this.selectedItemSgst({ id: d[obj?.field] }, d, obj?.field, null, obj?.parentsVals);
                  this.selected({ value: d[obj?.field] }, d, null, obj?.parentsVals, obj);
                }
              }
              if (obj?.type === 'suggest') {
                if (obj?.parentsVals?.length) {
                  //this.selectedItemSgst({ id: d[obj?.field] }, d, obj?.field, null, obj?.parentsVals);
                }
              }
              this.errorStyle(d, obj, d[obj?.field], obj?.required ?? false, obj?.parentsVals ?? []);
            }
          }

        });
      }
    }

  }
  onClearSuggt(e: any, d: any, f: any, p: Array<ParentVal>): void {
    d[f] = null;
    if (p?.length) {
      p.forEach((v, i) => {
        d[v.parentField] = null;
      });
    }
  }
  errorStyle(d: any, h: any, val: any, req: boolean, p: Array<ParentVal>): void {
    h.errStyle = undefined;
    if (h?.unique && this.data?.length > 1) {
      let conteo = 0;
      this.data.forEach((v, i) => {
        if (val && v?.[h.field] === val) {
          conteo++;
          if (conteo > 1) {
            h.errStyle = 'danger';
            const row = d;
            row[h.field] = null;
            if (p?.length) {
              p.forEach((v, i) => {
                d[v.parentField] = null;
              });
            }
            this.tb.initRowEdit(row);
            this.messageService.add({ severity: 'warning', summary: 'Warning', detail: 'El dato ' + h.label + ' ya existe!' });
          }
        }

      });
    }
    if (req) {
      if (val === null || val === undefined || val === '') {
        h.errStyle = 'danger';
      }
    }
  }
  addRow(): void {
    this.isaddrow = true;
    const h: any[] = this.headerstab;
    const ob: any = {};

    h.forEach((v, i) => {
      ob[v.field] = null;
      if (v?.required) {
        this.required = true;
      }
      if (v?.value || v?.value === 0) {
        ob[v.field] = v?.value;
      }
    });

    ob.index = this.data.length;
    this.tb.value.push(ob);
    this.tb.initRowEdit(ob);
    this.isediting = true;
    this.OnTable.emit(this.isediting);
    this.getIsEditRow(true);
    this.rowData = ob ?? {};
  }
  modalErrStyle(d: any): void {
    const h: any[] = this.headerstab;
    this.required = false;
    h.forEach((v, i) => {
      if (v?.required) {
        h[i].errStyle = undefined;
        if (d[v.field] === null || d[v.field] === undefined || d[v.field] === '') {
          this.required = true;
          h[i].errStyle = 'danger';
        }
      }

      if (v?.toUpperCase && d[v.field]) {
        d[v.field] = (d[v.field]).toUpperCase();
      }
    });
  }
  modalStyle(): void {
    const h: any[] = this.headerstab;
    h.forEach((v, i) => {
      if (v?.required) {
        h[i].errStyle = undefined;
      }
    });
  }
  addModalRow(): void {
    if (!this.locked) {
      this.modalStyle();
      this.modal = _.cloneDeep(this.copyModal);
      this.displayModal = true;
      this.modelMode('NEW');
      const m = this.modal;
      m.index = this.data.length;
    }

  }

  onRowEditModalInit(d: any): void {

    this.modalStyle();
    this.modelMode('EDIT');
    this.dataModal = _.cloneDeep(d);
    this.displayModal = true;
    this.modal = d;
    this.calculaFactura(this.modal, this.locked ? !this.locked : this.isFacturacion);
  }
  onRowEditModalSave(): void {
    if (!this.locked) {
      if (this.isModalNew) {
        this.modalErrStyle(this.modal);
        if (!this.required) {
          this.data.push(this.modal);
        }
      }
      this.dataResponse.emit(this.data);
      this.OnRowSave.emit(this.modal);
      this.displayModal = false;
    }
  }
  onRowEditModalCancel(): void {
    this.displayModal = false;
    if (this.isModalEdit) {
      const r = this.modal;
      this.data[r.index] = this.dataModal;
    }
    this.dataModal = _.cloneDeep(this.copyModal);
    this.modelMode('VIEW');
  }

  onRowEditInit(d: any): void {
    this.isediting = true;
    this.OnTable.emit(this.isediting);
    this.cloneRow = _.cloneDeep(d);
    this.getIsEditRow(true);
    this.currentEdit = d;
    this.tb.initRowEdit(d);
    this.rowData = {};
    this.rowSelect = false;
  }


  onCloseModal(d: any): void {
    if (!this.isModalView) {
      this.modalErrStyle(d);
      if (!this.required) {

        this.modelMode('VIEW');
      } else {
        this.displayModal = true;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Completa los campos requeridos' });
      }
    }
  }

  onRowEditSave(d: any): void {
    console.log('data', d);
    const h: any[] = this.headerstab;
    this.required = false;
    h.forEach((v, i) => {
      if (v?.required) {
        h[i].errStyle = undefined;
        if (d[v.field] === null || d[v.field] === undefined || d[v.field] === '') {
          this.required = true;
          h[i].errStyle = 'danger';
        }
      }

      if (v?.toUpperCase && d[v.field]) {
        d[v.field] = (d[v.field]).toUpperCase();
      }
    });
    this.getIsEditRow(false);
    if (!this.required) {

      //this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Datos guardados.' });
      this.isediting = false;
      this.OnTable.emit(this.isediting);
      this.isaddrow = false;
      this.tb.saveRowEdit(d, this.tb.el.nativeElement);
      this.tb.cancelRowEdit(this.cloneRow);
      this.tb.isRowEditing(d);
      this.cloneRow = {};
      this.getIsEditRow(false);
    }
    else {
      const index = this.data.length - 1;
      //delete this.data[index];
      this.isaddrow = false;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Completa los campos requeridos' });
      this.isediting = true;
      this.OnTable.emit(this.isediting);
      this.tb.initRowEdit(d);
      this.getIsEditRow(true);
    }
    this.dataResponse.emit(this.data);
    this.OnRowSave.emit(d);
  }

  onRowEditCancel(d: any, index: number): void {
    this.isediting = false;
    this.OnTable.emit(this.isediting);
    this.data[index] = this.cloneRow;

    if (this.isaddrow) {
      this.cloneRow = {};
      this.data.splice(index, 1);
      this.isaddrow = false;
    }

    this.tb.cancelRowEdit(this.cloneRow);
    this.getIsEditRow(false);
  }

  onRowEditDelete(d: any, rowData: any, index: number): void {
    //FIXME: cuando el boton sea en el header de la tabla (click)="onRowEditDelete(rowData, rowData, rowData?.index ?? 0)"
    const h: any[] = this.headerstab;
    const key = 'index';
    let id: any;
    const sel = h.find((v) => v?.[key]);
    if (sel) {
      id = sel?.id;
    }
    this.confirmationService.confirm({
      message: 'Seguro quieres eliminar?',
      header: 'Eliminar Columna',
      icon: 'pi pi-info-circle text-danger',
      accept: () => {
        //---fix
        if (rowData?.[id]) {
          delete this.cloneRow[rowData?.[id]];
          this.cloneRow = {};
          this.dataDeleted.push({
            id: rowData?.[id],
          });
          this.delResponse.emit(this.dataDeleted);
        }
        //---fix
        const indice = this.data.findIndex(ob => ob.index === d.index);
        this.data.splice(indice, 1);
        this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Columna eliminada.' });
        this.dataResponse.emit(this.data);
        this.getIsEditRow(false);
        this.rowSelect = false;
      },
    });
  }

  getData(path: string | null): void {
    if (path) {
      this.loading$ = this.store.select(selectLoadingDataTable);
      this.store.dispatch(loadTAbleAction());

      this.sv.getDatasourse(path).subscribe(
        {
          next: (r: any) => {
            if (r?.length >= 0) {
              console.log('dataTable: ', r);
              const d: any[] = r ?? [];
              this.data = d;
              //this.loading = false;
              this.store.dispatch(loadedTAbleAction({ dataTable: d }));
              //
              this.rowSelect = false;
              this.selectedIndex = [];
              this.selectedIndex.length = 0;
            }
          },
          error: err => {
            this.store.dispatch(loadedTAbleAction({ dataTable: [] }));
          },
          complete: () => {
            //this.reset();
          },
        },
      );
    }
  }
  onCellClick(d: any, h: any): void {
    if (h.celClick) {
      h.celClick(d);
    }
    const e = d;
    if (h.habilitar) {
      this.sv.habilitar(h.url, d.id, ((d[h.field]) ? 0 : 1)).subscribe((r) => {
        e.estado = 1;
        if (r === 'Habilitado') {
          this.messageService.add({ severity: 'success', summary: 'Estado', detail: '' + r });
        }
        if (r === 'Deshabilitado') {
          e.estado = 0;
          this.messageService.add({ severity: 'success', summary: 'Estado', detail: '' + r });
        }
      });
    }
  }

  editR(d: any): void {
    if (this.btnsMin && !this.rowSelect) {
      return;
    }
    this.OnEdit.emit(d);
    this.selectedIndex = [];
  }

  selectR(d: any): void {
    if (this.btnsMin && !this.rowSelect) {
      return;
    }
    this.OnSelect.emit(d);
  }

  enableR(d: any, h: any): void {
    this.OnEnable.emit(d);
    const idname = Object.keys(d)[0] ?? ''; //NOTE: extrae el primer parametro que sera el id
    this.confirmationService.confirm({
      message: 'Seguro quieres Actualizar?',
      header: 'Actualizar ' + (this.tableName),
      icon: 'pi pi-info-circle text-warning',
      accept: () => {
        this.OnEnable.emit(d);
        this.habilitar(d, h);
      },
    });
  }

  habilitar(d: any, h: any): void {
    const obj = h.find((v: any) => v.enablePath);

    if (obj?.enablePath) {
      const id = d[obj?.field];
      let url = `${obj?.enablePath}/${id}`;
      const ls = (obj.enablePath)[(obj.enablePath).length - 1];
      if (ls === '/') {
        url = `${obj?.enablePath}${id}`;
      }

      let qsp = '';
      const qp: any[] = obj?.querySPEnable ?? [];
      qp.forEach(nm => {
        if (nm?.field) {
          const prm = d[nm?.field];
          qsp += `/` + prm;
        }
        if (!nm?.field) {
          qsp += `/` + nm;
        }
      });
      if (id) {
        this.sv.saveData(url + qsp, null).pipe()
          .subscribe({
            next: (data: any) => {
              if (data?.isSuccessful) {
                if (data?.codigoMsg === 1) {
                  this.messageService.add({ severity: 'success', summary: this.tableName ?? 'Row', detail: `${this.tableName ?? 'Row'}  Eliminado` });
                  //this.auto = true;
                }
                if (data?.codigoMsg === 2) {
                  this.messageService.add({ severity: 'warn', summary: 'Warning', detail: `${data?.errorMessage}` });
                }
              }

            },
            error: err => { },
            complete: () => {
              //this.reset();
            },
          },
          );
      }

    }
  }

  deleteR(d: any, n: string, h: any): void {
    if (this.btnsMin && !this.rowSelect) {
      if (this.btnsMin) { }
      return;

    }
    this.confirmationService.confirm({
      message: 'Seguro quieres eliminar?',
      header: 'Eliminar ' + (n) + ' ' + (d?.codigo ?? d?.nombre ?? ''),
      icon: 'pi pi-info-circle text-danger',
      accept: () => {
        this.OnDelete.emit(d);
        this.eliminando(d, n, h);
      },
    });
  }
  deleteRC(d: any, n: string): void {
    this.confirmationService.confirm({
      message: 'Seguro quieres eliminar?',
      header: 'Eliminar ' + (n),
      icon: 'pi pi-info-circle text-danger',
      accept: () => {
        //this.eliminando(id, index);
      },
    });
  }

  configR(d: any): void {
    if (this.btnsMin && !this.rowSelect) {
      return;
    }
    this.OnConfig.emit(d);
  }
  newR(): void {
    this.OnNew.emit();
    this.onRowUnselect(null);
  }

  handR(d: any): void {
    this.OnHand.emit(d);
    //this.onRowUnselect(null);
    this.rowSelect = false;
  }

  eliminando(d: any, n: string, h: any): void {
    const obj = h.find((v: any) => v.delPath);
    if (obj?.delPath) {
      const id = d[obj?.field];
      let url = `${obj?.delPath}/${id}`;
      const ls = (obj.delPath)[(obj.delPath).length - 1];
      if (ls === '/') {
        url = `${obj?.delPath}${id}`;
      }

      let qsp = '';
      const qp: any[] = obj?.querySParams ?? [];
      qp.forEach(nm => {
        qsp += `/` + nm;
      });
      if (id) {
        this.sv.delete(url + qsp).pipe()
          .subscribe({
            next: (data: any) => {
              if (data?.isSuccessful) {
                if (data?.codigoMsg === 1) {
                  this.messageService.add({ severity: 'success', summary: n ?? 'Row', detail: `${n ?? 'Row'}  Eliminado` });
                  //this.auto = true;
                }
                if (data?.codigoMsg === 2) {
                  this.messageService.add({ severity: 'warn', summary: 'Warning', detail: `${data?.errorMessage}` });
                }
              }

            },
            error: err => {
              //console.log('error..', err);
            },
            complete: () => {
              //this.reset();
            },
          },
          );
      }

    }

  }

  outputSug(d: any, f: any, ov: any, ol: any, oc: any): any {

    const dr: any[] = d ? d : [];

    const c = dr.find((v) => v[ov] === f);
    if (c) {
      const res = `${oc ? (c[oc] + ' - ') : ''}` + c[ol];
      return res;
    }
  }

  outputSugLabs(d: any, f: any, ov: any, lbl: Array<string>, sep: string | undefined): any {
    const dr: any[] = d ? d : [];
    const c = dr.find((v) => v[ov] === f);
    if (c) {
      let res = '';
      if (lbl?.length) {
        lbl.forEach((v, i) => {
          if (i > 0) {
            const spd = (sep && i > 1) ? ` ${sep} ` : ' ';
            res += spd + c[v];
          }
        });
      }

      if (lbl?.length === 1) {
        res = c[lbl[0]];
      }
      return `${lbl?.length > 1 ? '<div class="p-1 pt-0 pb-0  m-0 badge-info">' + (c[lbl[0]]) + '</div>' : ''}
              <div class="pl-1">${res}
              </div>`;
    }
  }

  concatInners(d: any, inrs: any[]): string {
    let str = '';
    inrs.forEach(v => { str += `-` + d[v] + str; });
    return str;
  }
  spaceCuenta(e: any, d: any): void {
    d = (d.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim()).toString();
    const v = e.target;
    v.value = d;
  }
  convertirDecimales(numero: number, minFractionDigits: number): string {
    // Redondea el número a la cantidad específica de decimales
    const factor = Math.pow(10, minFractionDigits);
    const numeroRedondeado = Math.round(numero * factor) / factor;
    // Convierte el número redondeado a una cadena con la cantidad deseada de decimales
    const numeroConDecimales = numeroRedondeado.toFixed(minFractionDigits);
    return numeroConDecimales;
  }

  ngOnDestroy(): void {
    //this.loading$.unsubscribe();
    if (1) { }
  }

}
