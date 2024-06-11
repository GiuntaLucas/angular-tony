import { CanActivateFn, Router, Routes } from '@angular/router';
import { LinksComponent } from './pages/links/links.component';
import { inject } from '@angular/core';
import { LinksService } from './services/links.service';
import { LoginComponent } from './pages/login/login.component';
import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { jwtDecode } from 'jwt-decode';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const auth = inject(AuthService);
  const token = auth.getCurrentToken();

  if (token) {
    let clone = req.clone({
      setHeaders:
      {
        Authorization: `Bearer ${token}`
      }
    })

    return next(clone)
  }
  return next(req)
}

export const adminGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const token = auth.getCurrentToken();
  
  const user: any =jwtDecode(token!);

  if(user.role !== 2) {
    return false;
  }

  return true;
};

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.getCurrentToken()) {
    router.navigateByUrl('/');
    return false;
  }
  return true;
};

export const preventAlreadyAuthGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.getCurrentToken()) {
    router.navigateByUrl('/links');
    return false;
  }
  return true;
};

export const routes: Routes = [
  {
    loadComponent: () => LoginComponent,
    path: '',
    canActivate: [preventAlreadyAuthGuard]
  },
  {
    loadComponent: () => LinksComponent,
    path: 'links',
    resolve: { links: () => inject(LinksService).getAll(), categories: () => inject(LinksService).getCategories() },
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '' }
];





