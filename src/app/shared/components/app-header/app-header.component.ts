import { UserService } from '@app/shared/services/user.service';
import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { LocalStoreService } from '../../services/local-store.service';
import { STOREKEY } from '@app/config/keys.config';
import { AppConfigService } from '@app/shared/services/config.service';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class AppHeaderComponent implements OnInit {
  open = false;
  userData: any;
  layoutMode: string | null = 'dark';

  displayModal = false;

  pathSucursal = '/sucursal-empresa?start=0&length=10&search=&order=asc&cod=0&cod=0';
  form: UntypedFormGroup = this.fb.group({
    id_empresa: [0],
    id_sucursal: [0],
  });
  constructor(
    private user: UserService,
    private persistence: LocalStoreService,
    private renderer: Renderer2,
    private el: ElementRef,
    private messageService: MessageService,
    private sv: AppConfigService,
    private fb: UntypedFormBuilder,
  ) { }

  ngOnInit(): void {
    const id_empresa = this.persistence.get(STOREKEY.ID_EMPRESA);
    const id_sucursal = Number(this.persistence.get(STOREKEY.ID_SUCURSAL));
    this.form.patchValue({ id_empresa: id_empresa, id_sucursal: id_sucursal });
    if (id_empresa === 0 || id_sucursal === 0) {
      this.displayModal = true;
    }

    this.userData = { ...this.persistence.get('userData') };
    const dl = document.documentElement.getAttribute('data-layout');
    const dss = document.documentElement.getAttribute('data-sidebar-size');
    if (dl === 'vertical' && dss === 'lg') {
      this.open = true;
    }
  }

  selectChange(e: any): void {
    const code = e > 0 ? e : 0;
    this.pathSucursal = `/sucursal-empresa?start=0&length=10&search=&order=asc&cod=${code}&doc=1`;
  }

  OnChange(e: any): void {
    if (e) {
      this.form.patchValue({
        id_sucursal: 0,
      });
    }
  }
  OnChangeSucursal(e: any): void {
    if (e) {
      this.sv.saveEmpresaSucursal({ id: this.userData.id, id_empresa: e?.id_empresa, id_sucursal: e?.id }).subscribe((r) => {
        if (r?.data) {
          const d = r?.data;
          this.form.patchValue({
            id_empresa: d?.id_empresa ?? 0,
            id_sucursal: d?.id_sucursal ?? 0,
          });
          this.persistence.set(STOREKEY.ID_EMPRESA, d?.id_empresa ?? 0);
          this.persistence.set(STOREKEY.ID_SUCURSAL, d?.id_sucursal ?? 0);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: r.message });
          location.reload();
        }
      });

    }
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: Event): void {
    const body = document.body;
    const target = event.target as HTMLElement;

    // Verifica si el clic fue fuera del elemento con el id "app-navbar-menu"
    if (!this.el.nativeElement.contains(target) && !target.closest('#app-navbar-menu')) {
      // Agrega la clase al body
      this.renderer.removeClass(body, 'vertical-sidebar-enable');
      this.open = false;
    }
  }

  logout(): void {
    this.user.clearUserSession();
  }


  addOrRemoveBodyClass(): void {
    const body = document.body;

    if (body.classList.contains('menu')) {
      // Si la clase "menu" existe en el body, la quitamos
      this.renderer.removeClass(body, 'menu');
    } else {
      // Si la clase "menu" no existe en el body, la agregamos
      this.renderer.addClass(body, 'menu');
    }

    const dl = document.documentElement.getAttribute('data-layout');
    if (dl === 'vertical' || dl === 'semibox') {
      const dss = document.documentElement.getAttribute('data-sidebar-size');
      this.open = dss === 'lg' ? true : false;
      document.documentElement.setAttribute('data-sidebar-size', (dss === 'lg' ? 'sm' : 'lg'));

      if (window.innerWidth < 768) {
        if (body.classList.contains('vertical-sidebar-enable')) {
          this.renderer.removeClass(body, 'vertical-sidebar-enable');
        } else {
          document.documentElement.setAttribute('data-sidebar-size', 'lg');
          this.renderer.addClass(body, 'vertical-sidebar-enable');
        }
      }
    }
  }

  changeMode(): void {
    this.layoutMode = document.documentElement.getAttribute('data-layout-mode');
    this.layoutMode = this.layoutMode === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-layout-mode', this.layoutMode);
  }
}
