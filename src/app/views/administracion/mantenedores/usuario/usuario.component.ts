import { Component, Injector, OnInit } from '@angular/core';
import { UntypedFormGroup, Validators } from '@angular/forms';
import { AbstractDocument } from '@app/shared/common/classes';
import { AppTable } from '@app/shared/components/app-table/app-table.interface';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
  providers: [ConfirmationService],
})
export class UsuarioComponent extends AbstractDocument implements OnInit {

  fullPath = '/usuario';
  headers: AppTable[] = [
    { field: 'id', label: 'id', visible: false },
    { field: 'nombres', label: 'Nombres' },
    { field: 'apellidos', label: 'Apellidos' },
    { field: 'email', label: 'Correo' },
    { field: 'username', label: 'usuario' },
    { field: 'password', label: 'password', visible: false },
    { field: 'telefono', label: 'telefono' },
    { field: 'habilitado', label: 'habilitado', type: 'habilitado' },
  ];

  form: UntypedFormGroup = this.fb.group({
    id: [],
    nombres: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    email: ['', [Validators.required]],
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    rep_password: ['', [Validators.required]],
    fecha_creacion: [new Date().toISOString().slice(0, 10)],
    habilitado: [true],
    telefono: [],
    photo: [],
    id_rol: ['', [Validators.required]],
  });
  constructor(
    injector: Injector,
    private confirmationService: ConfirmationService,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.hashValues = ['password', 'rep_password'];
  }

  selectChange(e: any): void {
    if (e?.id === 1) {
      this.confirmationService.confirm({
        message: `Seguro que deseas agregar el rol de Super Admin?
        <br>
        <a href="/configuracion/registro-de-rol" class="text-info float-end mt-3" rel="noopener noreferrer">Agregar Rol</a>`,
        header: 'Warning',
        icon: 'pi pi-exclamation-triangle text-warning',
        accept: () => {
          this.form.patchValue({ id_rol: e.id });
        },
        reject: () => {
          this.form.patchValue({ id_rol: null });
        },
      });
    }
  }
}
