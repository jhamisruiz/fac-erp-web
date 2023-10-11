import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministracionComponent } from './administracion.component';
import { AdministracionRoutingModule } from './administracion.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HomeAdministracionComponent } from './home-administracion/home-administracion.component';
import { UsuarioComponent } from './mantenedores/usuario/usuario.component';
import { SharedModule } from '@app/shared/shared.module';
import { EmpresaComponent } from './mantenedores/empresa/empresa.component';

@NgModule({
  declarations: [AdministracionComponent,
    HomeAdministracionComponent,
    UsuarioComponent,
    EmpresaComponent,
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
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
})
export class AdministracionModule { }
