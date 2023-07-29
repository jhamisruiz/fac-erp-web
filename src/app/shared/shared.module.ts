import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from './primeng/primeng.module';
import { AppHeaderModule } from './components/app-header/app-header.module';
import { AppSidebarModule } from './components/app-sidebar/app-sidebar.module';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  exports: [
    PrimengModule,
    AppHeaderModule,
    AppSidebarModule,
  ],
})
export class SharedModule { }
