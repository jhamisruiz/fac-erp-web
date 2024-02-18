import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of } from 'rxjs';
import { ItemModel } from '../intrefaces/app.interface';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {

  private getComponents = new BehaviorSubject<any[] | null>(null);
  getComponents$ = this.getComponents.asObservable();

  constructor(private http: HttpClient) { }
  setComponents(data: any[]): void {
    this.getComponents.next(data);
  }

  getMenu(): Observable<any> {
    return this.http.get(`menu/1`);
  }

  getUpdate(): Observable<boolean> {
    const d = true;
    return of(d).pipe(delay(1));
  }
  saveEmpresaSucursal(d: any): Observable<any> {
    return this.http.post(`usuario-empresa-sucursal`, d);
  }
  getDataApi2(): Observable<any> {
    return this.http.get(`empresa-efecto`);
  }

  getDataApi(): Observable<ItemModel[]> {
    const d = [{
      name: 'item 1',
      price: 10.00,
      image: '',
    }, {
      name: 'item 2',
      price: 10.00,
      image: '',
    }, {
      name: 'item 3',
      price: 10.00,
      image: '',
    }];
    return of(d).pipe(delay(1));
  }
  menuGlobal(): any[] {
    return [
      {
        nombreModulo: 'Gestión de Compra',
        url: 'gestion-de-compra',
        icono: 'fas fa-dot-circle',
        submenu: [
          {
            nombreModulo: 'Mantenedores',
            url: 'mantenedores',
            icono: 'fas fa-dot-circle',
            submenu: [
              {
                nombreModulo: 'Proveedores',
                url: 'proveedores',
                icono: 'fas fa-dot-circle',
                submenu: [],
              },
            ],
          },
          {
            nombreModulo: 'Movimientos',
            url: 'movimientos',
            icono: 'fas fa-dot-circle',
            submenu: [
              {
                nombreModulo: 'Requerimiento',
                url: 'requerimiento',
                icono: 'fas fa-dot-circle',
                submenu: [],
              },
              {
                nombreModulo: 'Emisión de solicitud de cotización desde un Requerimiento',
                url: 'emision-de-solicitud-de-cotizacion-desde-un-requerimiento',
                icono: 'fas fa-dot-circle',
                submenu: [],
              },
              {
                nombreModulo: 'Actualización de Cotización',
                url: 'actualizacion-de-cotizacion',
                icono: 'fas fa-dot-circle',
                submenu: [],
              },
              {
                nombreModulo: 'Solicitud de Cotización',
                url: 'solicitud-de-cotizacion',
                icono: 'fas fa-dot-circle',
                submenu: [],
              },
              {
                nombreModulo: 'Evaluación de Cotización',
                url: 'evaluacion-de-cotizacion',
                icono: 'fas fa-dot-circle',
                submenu: [],
              },
              {
                nombreModulo: 'Orden de Compra',
                url: 'orden-de-compra',
                icono: 'fas fa-dot-circle',
                submenu: [],
              },
              {
                nombreModulo: 'Aprobación de Orden de Compra',
                url: 'aprobacion-de-orden-de-compra',
                icono: 'fas fa-dot-circle',
                submenu: [],
              },
              {
                nombreModulo: 'Compra Directa',
                url: 'compra-directa',
                icono: 'fas fa-dot-circle',
                submenu: [],
              },
            ],
          },
        ],
      },
    ];
  }
}
