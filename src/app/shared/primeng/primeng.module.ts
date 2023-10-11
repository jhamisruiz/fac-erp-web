import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { TreeModule } from 'primeng/tree';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TreeTableModule } from 'primeng/treetable';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MessageService, SharedModule } from 'primeng/api';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ToastModule } from 'primeng/toast';
import { InputMaskModule } from 'primeng/inputmask';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';
import { MultiSelectModule } from 'primeng/multiselect';
import { TreeSelectModule } from 'primeng/treeselect';
import { SkeletonModule } from 'primeng/skeleton';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ListboxModule } from 'primeng/listbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { FieldsetModule } from 'primeng/fieldset';
import { ChipsModule } from 'primeng/chips';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    ChipsModule,
    ListboxModule,
    AvatarGroupModule,
    AvatarModule,
    SkeletonModule,
    TreeSelectModule,
    MultiSelectModule,
    TableModule,
    MessageModule,
    MessagesModule,
    SharedModule,
    ButtonModule,
    CheckboxModule,
    DialogModule,
    TabMenuModule,
    TabViewModule,
    TreeModule,
    TreeTableModule,
    DropdownModule,
    AutoCompleteModule,
    RadioButtonModule,
    ColorPickerModule,
    ToastModule,
    InputMaskModule,
    AccordionModule,
    InputNumberModule,
    FieldsetModule,
    CardModule,
    PaginatorModule,
    ProgressSpinnerModule,
    CalendarModule,
    InputSwitchModule,
  ],
  providers: [MessageService, { provide: LOCALE_ID, useValue: 'es' }],
})
export class PrimengModule { }
