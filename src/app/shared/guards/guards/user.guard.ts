/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ClientService } from '@app/shared/services/client.service';
import { UserService } from '@app/shared/services/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private user: UserService, private clientSv: ClientService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    //si no existe session redirige al login
    if (!this.user.isAuthenticated) {
      this.router.navigate(['/', 'login']);
      return false;
    } else {
      return true;
    }
  }

}
