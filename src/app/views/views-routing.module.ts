
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from '@app/shared/guards/guards/user.guard';
import { ViewsComponent } from './views.component';

const routes: Routes = [
  {
    path: '',
    component: ViewsComponent,
    children: [
      {
        path: '',
        loadChildren: (): Promise<any> =>
          import('./inicio/inicio-routing.module')
            .then(m => m.InicioRoutingModule),
      },
      {
        path: 'administracion',
        loadChildren: (): Promise<any> =>
          import('./administracion/administracion.module')
            .then(m => m.AdministracionModule),
        canActivate: [UserGuard],
      },
      {
        path: 'facturacion',
        loadChildren: (): Promise<any> =>
          import('./facturacion/facturacion.module')
            .then(m => m.FacturacionModule),
        canActivate: [UserGuard],
      },
      {
        path: 'planillas',
        loadChildren: (): Promise<any> =>
          import('./planillas/planillas.module')
            .then(m => m.PlanillasModule),
        canActivate: [UserGuard],
      },
      {
        path: 'caja',
        loadChildren: (): Promise<any> =>
          import('./caja/caja.module')
            .then(m => m.CajaModule),
        canActivate: [UserGuard],
      },
    ],
  },


];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ViewsRoutingModule { }
