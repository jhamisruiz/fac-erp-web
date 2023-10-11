import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserService } from '../services/user.service';
import { TRANSACTION_HEADER } from '../common/constants';
import { STOREKEY } from '@app/config/keys.config';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare const alertify: any;

@Injectable()
export class HttpConfig implements HttpInterceptor {

  constructor(
    private user: UserService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let url = req.url;

    if (!(/^http.?:\/\//.test(url)) && !url.startsWith('.')) {
      // Normalize URL
      const remoteUrl = environment.apiHost;
      const endpoint = url.split(/\/+/).filter(f => String(f ?? '').trim().length > 0);
      const protocol = `http${environment.apiSSL ? 's' : ''}`;
      const version = environment.apiVersion;

      url = `${protocol}://${[remoteUrl, version, ...endpoint].join('/')}`;
    }

    // Obtener el token de usuario.
    //NOTE: jalar tocken key de nuevo
    /* const getToken = (this.user.userToken) ?
      this.user.userToken : JSON.parse(localStorage.getItem('token') ?? 'null'); */
    const newToken = JSON.parse(localStorage.getItem('token') ?? 'null');
    const httpMethod = req.method;
    //const authToken = this.user.userToken ?? '';
    const authToken = newToken ? newToken : '';//FIXME:
    const cloneParams = req.params;
    const isTransaction = cloneParams.has('transactionId');
    const customHeaders: Record<string, string | string[]> = {};
    {
      authToken.length > 0 && (customHeaders['Authorization'] = `Bearer ${authToken}`);

      // COMPONENT_ID_HEADER
      if ('GET' !== httpMethod && isTransaction) {
        customHeaders[TRANSACTION_HEADER] = [...[cloneParams.get('transationId')]].join('');
        cloneParams.delete('transactionId');
      }
    }

    const httpReq = req.clone({
      url,
      setHeaders: customHeaders,
      params: cloneParams,
    });

    return next
      .handle(httpReq)
      .pipe(
        map(event => {
          // TODO: No actuar sobre respuesta de tipo ArrayBuffer | Blob
          // response instanceof ArrayBuffer || response instanceof Blob

          if (event instanceof HttpResponse) {
            if (undefined !== event.body?.error) {
              throw event.body;
            }
            //this.showHttpNotifications(event.body, event.status, httpMethod);
          }

          return event;
        }),
        catchError(err => {
          // TODO: Validar errores tipos Blob
          // if (err.error && err.error instanceof ArrayBuffer) {
          //   err.error = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(err.error) as any));
          // }

          const customError: Record<string, any> = {
            ...err,
          };

          if (err instanceof HttpErrorResponse) {
            const errorMessage = 'string' === typeof err.error ? err.error : (!window.navigator.onLine ? 'ERR_INTERNET_DISCONNECTED' : err.statusText);
            customError['code'] = err.status;
            customError['message'] = `#(${err.status}) ${errorMessage}`;
          }

          alertify.set('notifier', 'position', 'top-right');
          alertify.
            error(`${(customError['message']) ?? 'Error de servidor'}`);

          const exp = localStorage.getItem(STOREKEY.USER_EXPIRE) ?? '0';
          if (this.user.fechaexpire > Number(exp)) {
            this.user.clearUserSession();
          }
          return throwError(customError);
        }),
      );
  }

}
