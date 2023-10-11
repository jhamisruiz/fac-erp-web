import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from './primeng/primeng.module';
import { AppHeaderModule } from './components/app-header/app-header.module';
import { AppSidebarModule } from './components/app-sidebar/app-sidebar.module';
import { AppInputModule } from './forms/app-input/app-input.module';
import { AppSelectModule } from './forms/app-select/app-select.module';
import { AppTableModule } from './components/app-table/app-table.module';
import { AppToolModule } from './components/app-tools/app-tool.module';
import { AppClickOutsideDirective } from './directives/app';
import { AppUbigeoModule } from './components/app-ubigeo/app-ubigeo.module';
import { AppInputFileModule } from './forms/app-input-file/app-input-file.module';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    AppClickOutsideDirective,
  ],
  exports: [
    PrimengModule,
    AppInputModule,
    AppInputFileModule,
    AppHeaderModule,
    AppSidebarModule,
    AppSelectModule,
    AppTableModule,
    AppToolModule,
    AppUbigeoModule,
    //
    AppClickOutsideDirective,
  ],
})
export class SharedModule { }
