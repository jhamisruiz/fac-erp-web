import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppInputComponent } from './app-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';



@NgModule({
  declarations: [
    AppInputComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputNumberModule,
  ],
  exports: [AppInputComponent],
})
export class AppInputModule { }
