import { SharedModule } from '@app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioModule } from './inicio/inicio.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ViewsRoutingModule } from './views-routing.module';
import { ViewsComponent } from './views.component';
import { PlanillasModule } from './planillas/planillas.module';

@NgModule({
  declarations: [
    ViewsComponent,
  ],
  imports: [
    CommonModule,
    InicioModule,
    PlanillasModule,
    ReactiveFormsModule,
    FormsModule,
    ViewsRoutingModule,
    RouterModule,
    SharedModule,
  ],
  exports: [
    InicioModule,
    PlanillasModule,
  ],
})
export class ViewsModule { }
