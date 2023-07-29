import { UserService } from '@app/shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { LocalStoreService } from '../../services/local-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent implements OnInit {
  userData: any;

  constructor(
    private user: UserService,
    private persistence: LocalStoreService,
  ) { }

  ngOnInit(): void {
    if (1) { }
    this.userData = { ...this.persistence.get('userData') };
  }

  logout(): void {
    this.user.clearUserSession();
  }
}
