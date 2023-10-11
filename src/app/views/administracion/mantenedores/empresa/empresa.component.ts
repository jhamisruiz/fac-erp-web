import { Component, Injector, OnInit } from '@angular/core';
import { UntypedFormGroup, Validators } from '@angular/forms';
import { AbstractDocument } from '@app/shared/common/classes';
import { AppTable } from '@app/shared/components/app-table/app-table.interface';
import { AppServicesService } from '@app/shared/services/app-services/app-services.service';
import { UniqueDoc } from '@app/shared/validators/unique-document';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss'],
})
export class EmpresaComponent extends AbstractDocument implements OnInit {

  fullPath = '/empresa';
  prueba = true;
  data: any[] = [];
  headers: AppTable[] = [
    {
      field: 'id',
      label: 'id',
      visible: false,
    },
    {
      field: 'numero_documento',
      label: 'numero documento',
    },
    {
      field: 'razon_social',
      label: 'razon social',
    },
    {
      field: 'nombre_comercial',
      label: 'nombre comercial',
    },
    {
      field: 'departamento',
      label: 'departamento',
    },
    {
      field: 'provincia',
      label: 'provincia',
    },
    {
      field: 'distrito',
      label: 'distrito',
    },
    {
      field: 'usuario_emisor',
      label: 'usuario_emisor',
    },
    {
      field: 'habilitado',
      label: 'habilitado',
      estado: true,
    },
  ];

  form: UntypedFormGroup = this.fb.group(
    {
      id: [],
      tipo_documento: ['6', [Validators.required]],
      numero_documento: [{ value: null, disabled: this.isEditMode }, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{11}$/)],
      Validators.composeAsync([UniqueDoc(this.codeValidator.bind(this))])],
      razon_social: ['', [Validators.required]],
      nombre_comercial: ['', [Validators.required]],
      departamento: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
      distrito: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      ubigeo: ['', [Validators.required]],
      usuario_emisor: ['', [Validators.required]],
      clave_emisor: ['', [Validators.required]],
      certificado: [],
      clave_certificado: [],
      fecha_creacion: [new Date().toISOString().slice(0, 10)],
      habilitado: [true],
    },
  );
  counter = 0;
  constructor(
    injector: Injector,
    private sv: AppServicesService,
  ) {
    super(injector);
    console.log(this.isViewMode, 'this.isEditMode', this.isEditMode);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }


  pruebas(): void {
    this.form = this.fbgroup();

    console.log(this.form);
  }

  fbgroup(): any {
    return this.fb;
  }

  getUbigeo(e: any): void {
    this.form.patchValue({
      departamento: e.departamento,
      provincia: e.provincia,
      distrito: e.distrito,
      ubigeo: e.ubigeo,
    });
  }

  getFile(e: any): void {
    if (e === null || (e?.nombre && e?.data)) { }
    this.form.patchValue({
      certificado: e,
    });

  }

  onInput(e: any): void {
    if (e?.length === 11) {
      this.sv.getDniRuc({ 'dni_ruc': e }).subscribe((r: any) => {
        if (r) {
          this.form.patchValue({
            razon_social: r?.nombre,
            nombre_comercial: r?.viaNombre,
            ubigeo: r?.ubigeo,
            direccion: r?.direccion,
          });
        }
      });
    }
  }

}
