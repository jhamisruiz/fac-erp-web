import { Component, OnInit } from '@angular/core';
import { AppState } from '../store/state/app.state';
import { Store } from '@ngrx/store';
import { selectLoadingCompForm } from '../store/selectors/app.selectors';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AppConfigService } from '@app/shared/services/config.service';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.scss'],
})
export class ViewsComponent implements OnInit {

  url: any;
  updateComponent = true;

  viewMode = 'VIEW';
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private sv: AppConfigService,
  ) {
    this.store.select(selectLoadingCompForm).subscribe((r) => {
      if (r?.formMode) {
        this.viewMode = r?.formMode;
        this.update();
      }
    });
  }

  ngOnInit(): void {
    if (1) { }
    const url = this.router.url;
    this.url = url.split('/');
    this.routerLink();
  }
  routerLink(): any {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        this.url = e.url.split('/');
      });
  }
  update(): void {
    this.updateComponent = false;
    // Promise.resolve().then(() => this.updateComponent = true);
    this.sv.getUpdate().subscribe((r) => {
      this.updateComponent = r;
    });
  }

}
