import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppToolComponent } from './app-tool.component';
import { FormsModule } from '@angular/forms';
import { ContextMenuModule } from 'primeng/contextmenu';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ContextMenuModule,
  ],
  declarations: [AppToolComponent],
  exports: [AppToolComponent],
})
export class AppToolModule { }
