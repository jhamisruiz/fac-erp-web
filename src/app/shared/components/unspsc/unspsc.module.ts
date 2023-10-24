import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnspscComponent } from './unspsc.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppInterceptor } from '../../interceptors/app.interceptor';

@NgModule({
  declarations: [UnspscComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    MultiSelectModule,
    DropdownModule,
  ],
  exports: [UnspscComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true,
    },
  ],
})
export class UnspscModule { }
