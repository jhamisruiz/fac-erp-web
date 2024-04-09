import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { AppTableService } from '../app-table/app-table.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'app-select-roles',
  templateUrl: './app-select-roles.component.html',
  styleUrls: ['./app-select-roles.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppSelectRolesComponent),
      multi: true,
    },
  ],
})
export class AppSelectRolesComponent implements OnInit {
  @Input() path?: string;
  @Input() id: number = 0;
  @Input() usuario_id: number = 0;

  @Input() set refresh(d: boolean | undefined) {
    if (d === true) {
      if (this.path) {
        this.getData(this.path, this.id);
      }
    }
  }

  data: any[] = [];

  @Output() OnChangeData = new EventEmitter<any[] | null>();
  @Output() dataResponse = new EventEmitter<any>();

  constructor(
    private sv: AppTableService,
  ) { }

  ngOnInit(): void {
    if (this.path) {
      this.getData(this.path, this.id);
    }
  }

  getData(path: string, id: number): void {
    if (id === 0) {
      this.sv.getDatasourse(`menu?userid=` + this.usuario_id).subscribe((r: any[]) => {
        this.setDataSourse(r);
      });

    }
    if (id > 0) {
      this.sv.get(`${path}/` + id).subscribe((r: any[]) => {
        this.setDataSourse(r);
      });
    }
  }

  setDataSourse(r: any[]): void {
    if (r.length) {
      this.data = r;
      this.data.forEach((v, i) => {
        this.data[i].active = false;
        this.data[i].selected = false;
        this.data[i].indeterminate = false;

        if (v?.componentes?.length) {
          const componentes: any[] = v?.componentes;
          componentes.forEach((cv, ci) => {
            componentes[ci].active = false;
            componentes[ci].selected = false;
            componentes[ci].indeterminate = false;
            this.switchActive(null, componentes[ci]);
          });
        }
        this.indeterminate(v);
      });

    }
  }

  onChange(e: any, d: any): void {
    let val = false;
    if (e.target) {
      if (e.target.checked === true) {
        d.indeterminate = false;
        val = true;
      } else {
        d.indeterminate = false;
        d.selected = false;
        val = false;
      }
      if (d?.componentes?.length) {
        const componentes: any[] = d.componentes;
        componentes.forEach((v, i) => {
          componentes[i].active = val;
          componentes[i].selected = val;
          componentes[i].indeterminate = false;
          componentes[i].user_create = val;
          componentes[i].user_update = val;
          componentes[i].user_read = val;
          componentes[i].user_delete = val;
        });
      }
      this.dataResponse.emit(this.getPermisos());
    }
  }

  onChangeChild(e: any, d: any): void {
    let val = false;
    if (e.target) {
      if (e.target.checked === true) {
        d.indeterminate = false;
        val = true;
      } else {
        d.indeterminate = false;
        d.selected = false;
        val = false;
      }
      d.active = val;
      d.selected = val;
      d.indeterminate = false;
      d.user_create = val;
      d.user_read = val;
      d.user_update = val;
      d.user_delete = val;
      this.dataResponse.emit(this.getPermisos());
    }
  }
  switchActive(e: any, c: any): void {
    if (c.user_create === true && c.user_read === true && c.user_update === true && c.user_delete === true) {
      c.active = true; c.selected = true; c.indeterminate = false;
    } else if (c.user_create === false && c.user_read === false && c.user_update === false && c.user_delete === false) {
      c.active = false; c.selected = false; c.indeterminate = false;
    } else {
      c.active = true; c.selected = false; c.indeterminate = true;
    }
  }

  indeterminate(d: any): void {
    const componente: any[] = d?.componentes ?? [];
    let countTrue = 0;
    let countFalse = 0;
    let countIndeterminate = 0;
    componente.forEach((v) => {
      if (v.selected === true) {
        countTrue = countTrue + 1;
      } if (v.selected === false) {
        countFalse = countFalse + 1;
      } if (v.indeterminate === true) {
        countIndeterminate = countIndeterminate + 1;
      }
    });

    if (countTrue > 0 && countFalse === 0) {
      d.active = true;
      d.selected = true;
      d.indeterminate = false;
    }
    if (countFalse > 0 && countTrue === 0) {
      d.active = false;
      d.selected = false;
      d.indeterminate = false;
    }
    if (countTrue > 0 && countFalse > 0) {
      d.active = true;
      d.selected = false;
      d.indeterminate = true;
    }
    if (countIndeterminate > 0) {
      d.active = true;
      d.selected = false;
      d.indeterminate = true;
    }
    this.dataResponse.emit(this.getPermisos());
  }

  getPermisos(): any[] | null {
    return this.data;//.filter(objeto => objeto.selected === true || objeto.indeterminate === true);
  }

}
