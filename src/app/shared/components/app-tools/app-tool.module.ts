import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppToolComponent } from './app-tool.component';
import { FormsModule } from '@angular/forms';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ContextMenuModule,
    ToastModule,
    MessagesModule,
  ],
  declarations: [AppToolComponent],
  exports: [AppToolComponent],
})
export class AppToolModule { }
