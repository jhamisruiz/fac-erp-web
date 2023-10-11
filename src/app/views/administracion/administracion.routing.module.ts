import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from '@app/shared/guards/guards/user.guard';
import { AdministracionComponent } from './administracion.component';
import { UsuarioComponent } from './mantenedores/usuario/usuario.component';
import { HomeAdministracionComponent } from './home-administracion/home-administracion.component';
import { EmpresaComponent } from './mantenedores/empresa/empresa.component';

const routes: Routes = [
  {
    path: '',
    component: AdministracionComponent,
    canActivate: [UserGuard],
    children: [
      {
        path: '',
        component: HomeAdministracionComponent,
        canActivate: [UserGuard],
      },
      {
        path: 'registro-de-usuarios',
        component: UsuarioComponent,
        canActivate: [UserGuard],
      },
      {
        path: 'registro-de-empresas',
        component: EmpresaComponent,
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

export class AdministracionRoutingModule { }
