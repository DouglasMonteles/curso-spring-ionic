import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HTTP_INTERCEPTORS
} from "@angular/common/http";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .catch((error, caught) => {

        let errorObj = error;

        if (errorObj.error) {
          errorObj = errorObj.error;
        }

        if (!errorObj.status) {
          errorObj = JSON.parse(errorObj);
        }

        return Observable.throw(error);
      }) as any;
  }

}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
