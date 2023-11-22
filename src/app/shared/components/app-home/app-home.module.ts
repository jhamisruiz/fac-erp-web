import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHomeComponent } from './app-home.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppHomeComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    AppHomeComponent,
  ],
})
export class AppHomeModule { }
