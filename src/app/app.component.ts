import { Component } from '@angular/core';
import { MenuBroadcastService } from '@services/broadcast-services/menu-broadcast.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MenuBroadcastService],
})
export class AppComponent {
  title = 'fac-erp-web';

  constructor(private broadcastService: MenuBroadcastService) {
    this.broadcastService.broadcastInit();
  }

}
