import { NavigationEnd, Router } from '@angular/router';
import { AppConfigService } from './../../services/config.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { filter } from 'rxjs';
import { loadCompAction } from '../../../store/actions/app.actions';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/state/app.state';

@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.scss'],
})
export class AppSidebarComponent implements OnInit {

  sidebarVisible = false;
  layoutMode: string | null = 'dark';
  //
  menuSider: any[] = [];
  menuUrl = '';
  newURL = '';

  constructor(
    private sv: AppConfigService,
    private router: Router,
    private store: Store<AppState>,
    private renderer: Renderer2,
  ) { }

  onClick(e: Event): void {
    const el = e.target as HTMLElement;
    const ariaExpanded = el.getAttribute('aria-expanded');

    if (ariaExpanded !== null) {
      el.setAttribute('aria-expanded', (ariaExpanded === 'true' ? 'false' : 'true'));
      const next = el.nextElementSibling as HTMLElement;

      if (ariaExpanded === 'false') {
        this.renderer.addClass(next, 'show');
      } else {
        this.renderer.removeClass(next, 'show');
      }
    } else {
      const parent = el.parentElement;

      if (parent) {
        const parentAriaExpanded = parent.getAttribute('aria-expanded');

        if (parentAriaExpanded !== null) {
          parent.setAttribute('aria-expanded', (parentAriaExpanded === 'true' ? 'false' : 'true'));
          const next = parent.nextElementSibling as HTMLElement;

          if (parentAriaExpanded === 'false') {
            this.renderer.addClass(next, 'show');
          } else {
            this.renderer.removeClass(next, 'show');
          }
        }
      }
    }
  }



  ngOnInit(): void {
    const url = this.router.url;
    const arr = url.split('/');
    this.menuUrl = arr[1];
    this.routerLink(arr[1]);
    this.sv.getMenu().subscribe((r) => {
      this.menuSider = r;
      this.sv.setComponents(r);
    });
  }

  routerLink(murl: string): any {

    this.newURL = murl;
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        const arr = e.url.split('/');
        this.store.dispatch(loadCompAction({ formMode: 'VIEW', id: null }));
        //this.sv.setComponents(this.menuSider);
        if (arr[2] === murl) {
          this.menuUrl = murl;
        }
      });
  }

  dataSidebarSize(m: string): void {
    this.layoutMode = document.documentElement.getAttribute('data-sidebar-size');
    this.layoutMode = m;
    document.documentElement.setAttribute('data-sidebar-size', this.layoutMode);
    document.documentElement.setAttribute('data-layout', 'vertical');
  }
  dataLayoutStyle(m: string): void {
    document.documentElement.setAttribute('data-layout-style', m);
  }
  dataLayout(m: string): void {
    this.layoutMode = document.documentElement.getAttribute('data-layout');
    this.layoutMode = m;
    document.documentElement.setAttribute('data-layout', this.layoutMode);
    document.documentElement.setAttribute('data-sidebar-size', 'lg');
  }

  dataLayoutMode(m: string): void {
    this.layoutMode = document.documentElement.getAttribute('data-layout-mode');
    this.layoutMode = m;
    document.documentElement.setAttribute('data-layout-mode', this.layoutMode);
  }
  dataSidebar(m: string): void {
    document.documentElement.setAttribute('data-sidebar', m);
  }
}
