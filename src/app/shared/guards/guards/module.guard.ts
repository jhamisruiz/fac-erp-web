import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot,
} from '@angular/router';
import { STOREKEY } from '@app/config/keys.config';
import { AppService } from '@app/shared/services/app.service';
import { LocalStoreService } from '@app/shared/services/local-store.service';
import { UserService } from '@app/shared/services/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ModuleGuard implements CanActivate {
  constructor(
    private location: Location,
    private app: AppService,
    private user: UserService,
    private persistence: LocalStoreService,
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url = state.url;
    const arr = url.split('/');
    let rutasPermitidas: any[];

    const ruta = route.url[0].path;
    const modulopath = this.persistence.get(STOREKEY.MODULOS_PATH);
    //console.log('arr: ', arr);
    const modulo = modulopath.find((modelule: any) => modelule.url === arr[1]);
    if (modulo) {
      const menu = modulo?.submenu ?? [];
      const componente = menu.find((c: any) => c.url === arr[2]);
      if (componente) {
        rutasPermitidas = componente?.submenu ?? [];
        const isruta = rutasPermitidas.find((r: any) => r.url === ruta);
        if (isruta) {
          //console.log('isrutas: ', isruta);
          return true;
        } else {
          //console.log('isruta: ', 'isruta');
          this.router.navigate(['/', 'panel']);
        }
      }
    }
    return false;
    // console.log('this.user.isValidPaths: ', modulopath);
    // return true;
    // if (rutasPermitidas.includes(ruta)) {
    // } else {
    //   // Redireccionar a una página de error 404
    //   //this.router.navigate(['/404']);
    //   return false;
    // }
  }


}
