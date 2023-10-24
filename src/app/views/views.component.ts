import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '../shared/services/config.service';
import { AppState } from '../store/state/app.state';
import { Store } from '@ngrx/store';
import { selectLoadingCompForm } from '../store/selectors/app.selectors';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.scss'],
})
export class ViewsComponent implements OnInit {

  updateComponent = true;
  constructor(private store: Store<AppState>, private sv: AppConfigService) {
    this.store.select(selectLoadingCompForm).subscribe((r) => {
      if (r?.mode) {
        this.update();
      }
    });
  }

  ngOnInit(): void {
    if (1) { }
  }

  update(): void {
    this.updateComponent = false;

    this.sv.getUpdate().subscribe((r) => {
      this.updateComponent = r;
    });
  }

}
