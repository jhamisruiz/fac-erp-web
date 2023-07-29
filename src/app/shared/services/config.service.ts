import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {

  constructor() { }


  menuGlobal(): any[] {
    return [
      {
        nombreModulo: 'Seguridad',
        url: 'seguridad',
        icono: 'fas fa-dot-circle',
        submenu: [
          {
            nombreModulo: 'Mantenedor',
            url: 'mantenedores',
            icono: 'fas fa-dot-circle',
            submenu: [
              {
                nombreModulo: 'Rol',
                url: 'roles',
                icono: 'fas fa-dot-circle',
                submenu: [],
              },
              {
                nombreModulo: 'Usuario',
                url: 'usuarios',
                icono: 'fas fa-dot-circle',
                submenu: [],
              },
              {
                nombreModulo: 'Mi Perfil',
                url: 'perfil',
                icono: 'fas fa-dot-circle',
                submenu: [],
              },
              {
                nombreModulo: 'LogSistema',
                url: 'log-sistema',
                icono: 'fas fa-dot-circle',
                submenu: [],
              },
              {
                nombreModulo: 'Cambiar Clave',
                url: 'cambiar-clave',
                icono: 'fas fa-dot-circle',
                submenu: [],
              },
            ],
          },
        ],
      },
      {
        nombreModulo: 'Administración',
        url: 'administracion',
        icono: 'fas fa-dot-circle',
        submenu: [
          {
            nombreModulo: 'Mantenedores',
            url: 'mantenedores',
            icono: 'fas fa-dot-circle',
            submenu: [
              {
                nombreModulo: 'Empresas',
                url: 'empresa',
                icono: 'fas fa-dot-circle',
                submenu: [],
              },
              {
                nombreModulo: 'Colaboradores',
                url: 'colaboradores',
                icono: 'fas fa-dot-circle',
                submenu: [],
              },
              {
                nombreModulo: 'Familia,Lineas y Categoria',
                url: 'familia-linea-categoria',
                icono: 'fas fa-dot-circle',
                submenu: [],
              },
              {
                nombreModulo: 'Almacen',
                url: 'almacen',
                icono: 'fas fa-dot-circle',
                submenu: [],
              },
              {
                nombreModulo: 'Forma de Pago',
                url: 'forma-de-pago',
                icono: 'fas fa-dot-circle',
                submenu: [],
              },
              {
                nombreModulo: 'Marca',
                url: 'marcas',
                icono: 'fas fa-dot-circle',
                submenu: [],
              },
              {
                nombreModulo: 'Unidad de Medida',
                url: 'unidad-de-medida',
                icono: 'fas fa-dot-circle',
                submenu: [],
              },
              {
                nombreModulo: 'Productos',
                url: 'productos',
                icono: 'fas fa-dot-circle',
                submenu: [],
              },
              {
                nombreModulo: 'Tipo de Cambio',
                url: 'tipo-de-cambio',
                icono: 'fas fa-dot-circle',
                submenu: [],
              },
              {
                nombreModulo: 'Tabla sunat',
                url: 'tabla-sunat',
                icono: 'fas fa-dot-circle',
                submenu: [],
              },
            ],
          },
        ],
      },
      {
        nombreModulo: 'Gestión de Compra',
        url: 'gestion-de-compra',
        icono: 'fas fa-dot-circle',
        submenu: [
          {
            nombreModulo: 'Mantenedores',
            url: 'mantenedores',
            icono: 'fas fa-dot-circle',
            submenu: [
              {
                nombreModulo: 'Proveedores',
                url: 'proveedores',
                icono: 'fas fa-dot-circle',
                submenu: [],
              },
            ],
          },
          {
            nombreModulo: 'Movimientos',
            url: 'movimientos',
            icono: 'fas fa-dot-circle',
            submenu: [
              {
                nombreModulo: 'Requerimiento',
                url: 'requerimiento',
                icono: 'fas fa-dot-circle',
                submenu: [],
              },
              {
                nombreModulo: 'Emisión de solicitud de cotización desde un Requerimiento',
                url: 'emision-de-solicitud-de-cotizacion-desde-un-requerimiento',
                icono: 'fas fa-dot-circle',
                submenu: [],
              },
              {
                nombreModulo: 'Actualización de Cotización',
                url: 'actualizacion-de-cotizacion',
                icono: 'fas fa-dot-circle',
                submenu: [],
              },
              {
                nombreModulo: 'Solicitud de Cotización',
                url: 'solicitud-de-cotizacion',
                icono: 'fas fa-dot-circle',
                submenu: [],
              },
              {
                nombreModulo: 'Evaluación de Cotización',
                url: 'evaluacion-de-cotizacion',
                icono: 'fas fa-dot-circle',
                submenu: [],
              },
              {
                nombreModulo: 'Orden de Compra',
                url: 'orden-de-compra',
                icono: 'fas fa-dot-circle',
                submenu: [],
              },
              {
                nombreModulo: 'Aprobación de Orden de Compra',
                url: 'aprobacion-de-orden-de-compra',
                icono: 'fas fa-dot-circle',
                submenu: [],
              },
              {
                nombreModulo: 'Compra Directa',
                url: 'compra-directa',
                icono: 'fas fa-dot-circle',
                submenu: [],
              },
            ],
          },
        ],
      },
    ];
  }
}
