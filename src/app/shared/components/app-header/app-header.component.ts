import { UserService } from '@app/shared/services/user.service';
import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { LocalStoreService } from '../../services/local-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent implements OnInit {
  open = false;
  userData: any;
  layoutMode: string | null = 'dark';

  constructor(
    private user: UserService,
    private persistence: LocalStoreService,
    private renderer: Renderer2,
    private el: ElementRef,
  ) { }

  ngOnInit(): void {
    if (1) { }
    this.userData = { ...this.persistence.get('userData') };
    const dl = document.documentElement.getAttribute('data-layout');
    const dss = document.documentElement.getAttribute('data-sidebar-size');
    if (dl === 'vertical' && dss === 'lg') {
      this.open = true;
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
