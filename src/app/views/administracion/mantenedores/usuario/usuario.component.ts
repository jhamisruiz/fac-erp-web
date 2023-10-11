import { Component, Injector, OnInit } from '@angular/core';
import { UntypedFormGroup, Validators } from '@angular/forms';
import { AbstractDocument } from '@app/shared/common/classes';
import { AppTable } from '@app/shared/components/app-table/app-table.interface';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent extends AbstractDocument implements OnInit {

  fullPath = '/usuario';
  headers: AppTable[] = [
    {
      field: 'id',
      label: 'id',
      visible: false,
    },
    {
      field: 'nombres',
      label: 'Nombres',
    },
    {
      field: 'apellidos',
      label: 'Apellidos',
    },
    {
      field: 'email',
      label: 'Correo',
    },
    {
      field: 'username',
      label: 'usuario',
    },
    {
      field: 'password',
      label: 'password',
      visible: false,
    },
    {
      field: 'telefono',
      label: 'telefono',
    },
    {
      field: 'habilitado',
      label: 'estado',
      estado: true,
    },

  ];
  data: any[] = [];

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
  });
  constructor(
    injector: Injector,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.hashValues = ['password', 'rep_password'];
  }

}
