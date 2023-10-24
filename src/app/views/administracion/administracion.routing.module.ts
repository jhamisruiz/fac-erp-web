import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from '@app/shared/guards/guards/user.guard';
import { AdministracionComponent } from './administracion.component';
import { UsuarioComponent } from './mantenedores/usuario/usuario.component';
import { HomeAdministracionComponent } from './home-administracion/home-administracion.component';
import { EmpresaComponent } from './mantenedores/empresa/empresa.component';
import { SucursalComponent } from './mantenedores/sucursal/sucursal.component';
import { CategoriaComponent } from './mantenedores/categoria/categoria.component';
import { ProductoComponent } from './mantenedores/producto/producto.component';

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
      {
        path: 'registro-de-sucursales',
        component: SucursalComponent,
        canActivate: [UserGuard],
      },
      {
        path: 'registro-de-categorias',
        component: CategoriaComponent,
        canActivate: [UserGuard],
      },
      {
        path: 'registro-de-productos',
        component: ProductoComponent,
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
