import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token: string = inject(CookieService).get('JWT_Token');
  if (token) {
    const modifiedReq = req.clone({
      setHeaders: {
        'X-Token': token,
      },
    });
    return next(modifiedReq);
  } else {
    return next(req);
  }
};
