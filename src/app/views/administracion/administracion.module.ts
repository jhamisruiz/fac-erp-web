import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministracionComponent } from './administracion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HomeAdministracionComponent } from './home-administracion/home-administracion.component';
import { UsuarioComponent } from './mantenedores/usuario/usuario.component';
import { SharedModule } from '@app/shared/shared.module';
import { EmpresaComponent } from './mantenedores/empresa/empresa.component';
import { SucursalComponent } from './mantenedores/sucursal/sucursal.component';
import { CategoriaComponent } from './mantenedores/categoria/categoria.component';
import { ProductoComponent } from './mantenedores/producto/producto.component';
import { AdministracionRoutingModule } from './administracion.routing';

@NgModule({
  declarations: [AdministracionComponent,
    HomeAdministracionComponent,
    UsuarioComponent,
    EmpresaComponent,
    SucursalComponent,
    CategoriaComponent,
    ProductoComponent,
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    SharedModule,
    HttpClientModule,
  ],
  exports: [
    HomeAdministracionComponent,
    UsuarioComponent,
    EmpresaComponent,
    SucursalComponent,
    CategoriaComponent,
    ProductoComponent,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
})
export class AdministracionModule { }
