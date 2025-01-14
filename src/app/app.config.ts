import { ApplicationConfig } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { jwtInterceptor } from './core/interceptors/jwt.interceptor';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
      }),), provideHttpClient(withInterceptors([jwtInterceptor])),
    provideAnimationsAsync(), provideCharts(withDefaultRegisterables()),
    provideCharts(withDefaultRegisterables())
  ],
};
