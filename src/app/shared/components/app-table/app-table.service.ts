import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppTableService {

  private changeState = new BehaviorSubject<boolean>(false);
  changeState$ = this.changeState.asObservable();

  private isRefresh = new BehaviorSubject<boolean>(false);
  isRefresh$ = this.isRefresh.asObservable();

  refreshData = new EventEmitter<any>();

  constructor(
    private http: HttpClient,
  ) { }

  getDatasourse(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  habilitar(url: string, id: any, d: any): Observable<any> {
    return this.http.patch<any>(`${url}/${id}/${d}`, '');
  }

  delete(url: string): Observable<any> {
    return this.http.delete<any>(`${url}`);
  }
  saveData(url: string, data: any): Observable<any> {
    return this.http.post<any>(`${url}`, data);
  }

  setRefresh(enabled: boolean): void {
    this.isRefresh.next(enabled);
  }

  setChangeState(e: boolean): void {
    this.changeState.next(e);
  }

  select(u: string): Observable<any> {
    // if (p) {
    //   const prms = this.params.params(p);
    //   return this.http.get<any>(`${u}?${prms}`);
    // }
    return this.http.get<any>(`${u}`);
  }

  suggest(u: any, f: boolean): Observable<any> {

    if (f) {
      return of(this.dataProds());
    }
    return this.http.get<any>(`${u}`);
  }

  dataProds(): any[] {
    return [
      {
        id: 1,
        title: `Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops`,
        price: 109.95,
        codigo: 'l-001',
        idUnidadMedida: 4,
        description: `Your perfect pack for everyday use and walks in the forest.
        Stash your laptop (up to 15 inches) in the padded sleeve, your everyday`,
        category: `men's clothing`,
        image: `https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg`,
        rating: {
          rate: 3.9,
          count: 120,
        },
      },
      {
        id: 2,
        title: `Mens Casual Premium Slim Fit T-Shirts `,
        price: 22.3,
        codigo: 't-001',
        idUnidadMedida: 6,
        description: `Slim-fitting style, contrast raglan long sleeve, three-button henley placket,
         light weight & soft fabric for breathable and comfortable wearing.
         And Solid stitched shirts with round neck made for durability and a
         great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.`,
        category: `men's clothing`,
        image: `https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg`,
        rating: {
          rate: 4.1,
          count: 259,
        },
      },
    ];
  }
}
