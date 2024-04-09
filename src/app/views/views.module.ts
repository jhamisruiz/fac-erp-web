import { SharedModule } from '@app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioModule } from './inicio/inicio.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ViewsRoutingModule } from './views.routing';
import { ViewsComponent } from './views.component';
import { PlanillasModule } from './planillas/planillas.module';
import { CajaModule } from './caja/caja.module';
import { AdministracionModule } from './administracion/administracion.module';
import { FacturacionModule } from './facturacion/facturacion.module';

@NgModule({
  declarations: [
    ViewsComponent,
  ],
  imports: [
    CommonModule,
    InicioModule,
    AdministracionModule,
    PlanillasModule,
    FacturacionModule,
    CajaModule,
    ReactiveFormsModule,
    FormsModule,
    ViewsRoutingModule,
    RouterModule,
    SharedModule,
  ],
  exports: [
    InicioModule,
    AdministracionModule,
    FacturacionModule,
    PlanillasModule,
    CajaModule,
  ],
})
export class ViewsModule { }
