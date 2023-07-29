import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSidebarComponent } from './app-sidebar.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    AppSidebarComponent,
  ],
  exports: [
    AppSidebarComponent,
  ],

})
export class AppSidebarModule { }
