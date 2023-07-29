import { NavigationEnd, Router } from '@angular/router';
import { AppConfigService } from './../../services/config.service';
import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.scss'],
})
export class AppSidebarComponent implements OnInit {

  menuSider: any[] = [];
  menuUrl = '';
  newURL = '';

  constructor(
    private sv: AppConfigService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.menuSider = this.sv.menuGlobal();
    const url = this.router.url;
    const arr = url.split('/');
    this.menuUrl = arr[1];
    this.routerLink(arr[1], 0);
  }

  routerLink(murl: string, n: number): any {

    this.newURL = murl;
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        const arr = e.url.split('/');
        console.log(n, ' arr', arr);
        if (arr[2] === murl) {
          this.menuUrl = murl;
        }
      });
  }

}
