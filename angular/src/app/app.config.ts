import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig, withViewTransitions } from '@angular/router';

import { authInterceptor, routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true,  }), 
    provideRouter(routes, withComponentInputBinding(), withRouterConfig({onSameUrlNavigation: 'reload'}), withViewTransitions()), 
    provideClientHydration(), 
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
  ]
};
