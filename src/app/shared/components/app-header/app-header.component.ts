import { UserService } from '@app/shared/services/user.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { LocalStoreService } from '../../services/local-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent implements OnInit {
  userData: any;
  layoutMode: string | null = 'dark';

  constructor(
    private user: UserService,
    private persistence: LocalStoreService,
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {
    if (1) { }
    this.userData = { ...this.persistence.get('userData') };
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
  }

  changeMode(): void {
    this.layoutMode = document.documentElement.getAttribute('data-layout-mode');
    this.layoutMode = this.layoutMode === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-layout-mode', this.layoutMode);
  }
}
