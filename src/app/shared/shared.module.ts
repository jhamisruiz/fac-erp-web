import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from './primeng/primeng.module';
import { AppHeaderModule } from './components/app-header/app-header.module';
import { AppSidebarModule } from './components/app-sidebar/app-sidebar.module';
import { AppInputModule } from './forms/app-input/app-input.module';
import { AppSelectModule } from './forms/app-select/app-select.module';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  exports: [
    PrimengModule,
    AppInputModule,
    AppHeaderModule,
    AppSidebarModule,
    AppSelectModule,
  ],
})
export class SharedModule { }
