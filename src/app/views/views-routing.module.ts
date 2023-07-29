
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from '@app/shared/guards/guards/user.guard';
import { ViewsComponent } from './views.component';
import { PlanillasComponent } from './planillas/planillas.component';

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
        path: 'planillas',
        //component: PlanillasComponent,
        loadChildren: (): Promise<any> =>
          import('./planillas/planillas.module')
            .then(m => m.PlanillasModule),
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
