import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTableComponent } from './app-table.component';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputNumberModule } from 'primeng/inputnumber';
import { ContextMenuModule } from 'primeng/contextmenu';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';
import { AccordionModule } from 'primeng/accordion';
import { SidebarModule } from 'primeng/sidebar';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BadgeModule } from 'primeng/badge';
import { ChipModule } from 'primeng/chip';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';



@NgModule({
  declarations: [AppTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    ContextMenuModule,
    SkeletonModule,
    TableModule,
    ToastModule,
    ImageModule,
    GalleriaModule,
    CarouselModule,
    AutoCompleteModule,
    CheckboxModule,
    InputSwitchModule,
    InputNumberModule,
    CascadeSelectModule,
    DropdownModule,
    MultiSelectModule,
    DialogModule,
    ButtonModule,
    OverlayPanelModule,
    CardModule,
    AccordionModule,
    SidebarModule,
    ConfirmDialogModule,
    MessagesModule,
    BadgeModule,
    ChipModule,
    RadioButtonModule,
    CalendarModule,
  ],
  exports: [AppTableComponent],
})
export class AppTableModule { }
