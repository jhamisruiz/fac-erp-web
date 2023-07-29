import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppHomeComponent } from './app-home/app-home.component';
import { UserGuard } from '@app/shared/guards/guards/user.guard';

const routes: Routes = [
  {
    path: '',
    component: AppHomeComponent,
    canActivate: [UserGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioRoutingModule { }
