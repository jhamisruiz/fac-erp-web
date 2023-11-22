import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { LocalStoreService } from './local-store.service';
import { BehaviorSubject, interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { STOREKEY } from 'src/app/config/keys.config';
import { Router } from '@angular/router';

export enum USER_STATUS {
  VALID,
  TOKEN_EXPIRES_SOON,
  TOKEN_EXPIRED,
  LOGOUT,
  DISABLED
}

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  public notifications = [];
  public currentModule = 0;
  public userLoginExpireAt = 0;

  public userId = 0;
  public profileId = 0;
  public sessionId = '';
  public userName = '';
  public userData = '';
  public userEmail = '';
  public userToken = '';
  //public companyId = 0;
  //public corporationId = '';


  private killTrigger: Subject<void> = new Subject();
  private status$ = new BehaviorSubject(USER_STATUS.DISABLED);

  constructor(
    private persistence: LocalStoreService,
    private router: Router,
    private zone: NgZone,
  ) {
    // Get stored expiration time
    this.userLoginExpireAt = this.persistence.get(STOREKEY.USER_LOGIN_EXPIRE);

    if (this.isAuthenticated) {
      this.loadStoredProperties();
      this.verifyLoginExpire();
    }
  }


  get isAuthenticated(): boolean {
    const expire = this.userLoginExpireAt;
    const userToken = this.persistence.get(STOREKEY.USER_TOKEN);
    const userId = this.persistence.get(STOREKEY.USER_ID);
    return this.fechaexpire < expire && userToken && userId;
  }

  get fechaexpire(): number {
    const fechaActual = new Date();
    const newDate = new Date(
      fechaActual.getFullYear(),
      fechaActual.getMonth(),
      fechaActual.getDate(),
      fechaActual.getHours(),
      fechaActual.getMinutes(),
      fechaActual.getSeconds(),
    );
    const time = (newDate.getTime()).toString();
    return Number(time.slice(0, -3));
  }

  authLogin(): any {
    return false;
  }

  loadStoredProperties(): void {
    this.userId = this.persistence.get(STOREKEY.USER_ID);
    this.currentModule = this.persistence.get(STOREKEY.CURRENT_MODULE);
    this.userToken = this.persistence.get(STOREKEY.USER_TOKEN);
    this.sessionId = this.persistence.get(STOREKEY.SESSIONID);
    this.userData = this.persistence.get('userData');
  }
  createSession(data: any, renew?: boolean): void {
    // Expiración del token
    console.log('isAuthenticated', this.isAuthenticated, 'timex-exp:', (((data.login_expire ?? 0) * 1e3) > Date.now()));
    this.userLoginExpireAt = data.expire;//(data.login_expire ?? 0) * 1e3;
    this.userName = data?.name;
    if (((data.login_expire ?? 0) * 1e3) > Date.now()) {
      this.persistence.set('currentUser', data.id);
      this.persistence.set(STOREKEY.USER_TOKEN, data.token);

      if (!renew) {
        this.persistence.set(STOREKEY.USER_ID, data.id);
        this.persistence.set('userData', {
          id: data.id,
          names: data.names,
          last_name: data.last_name,
          email: data.email,
          user_name: data.user_name,
          phone: data.phone,
          photo: data.photo,
          expire: data.expire,
        });
      }
      this.persistence.set(STOREKEY.USER_LOGIN_EXPIRE, data.expire); //this.data.expire);
      this.persistence.set(STOREKEY.USER_EXPIRE, Number(data.expire)); //this.data.expire);
    }

    this.verifyLoginExpire();
  }

  verifyLoginExpire(): void {
    this.zone.runOutsideAngular(() => {
      interval(1e3)
        .pipe(
          takeUntil(this.killTrigger),
        )
        .subscribe({
          next: () => {
            // Notifica cuando el token a expirado
            if (Date.now() >= this.userLoginExpireAt) {
              return this.zone.run(() => {
                this.status$.next(USER_STATUS.TOKEN_EXPIRED);
                this.ngOnDestroy();
              });
            }

            // Notifica 15 minutos antes de la expiración del token
            if (Date.now() >= (this.userLoginExpireAt - (15 * 60 * 1e3))) {
              this.zone.run(() => {
                this.status$.next(USER_STATUS.TOKEN_EXPIRES_SOON);
              });
            }
          },
        });
    });
  }
  clearUserSession(): void {
    this.persistence.clear();

    this.status$.next(USER_STATUS.LOGOUT);

    this.router.navigate(['/', 'admin', 'login']);
    this.ngOnDestroy();

  }

  ngOnDestroy(): void {
    this.killTrigger.next();
    this.killTrigger.complete();
  }
}
