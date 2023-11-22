import { Component, Input, OnInit } from '@angular/core';
import { AppConfigService } from '@app/shared/services/config.service';

@Component({
  selector: 'app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.scss'],
})
export class AppHomeComponent implements OnInit {
  @Input() moduloName?: string;

  componentes: any[] = [];
  constructor(private sv: AppConfigService) {

  }

  ngOnInit(): void {
    this.sv.getComponents$.subscribe((r) => {
      if (r) {
        if (this.moduloName) {
          const cmpnt = r.find((c: any) => c?.nombre === this.moduloName);
          this.componentes = cmpnt?.componentes ?? [];
        }

        if (this.moduloName === 'home') {
          this.componentes = r;
        }
      }
    });//'Administracion'
  }

}
