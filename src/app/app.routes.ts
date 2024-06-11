import { CanActivateFn, ResolveFn, Router, Routes } from '@angular/router';
import { LinksComponent } from './pages/links/links.component';
import { inject } from '@angular/core';
import { LinksService } from './services/links.service';
import { LoginComponent } from './pages/login/login.component';
import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable, forkJoin, tap } from 'rxjs';
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

  const user: any = jwtDecode(token!);

  if (user.role !== 2) {
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

const linksResolver: ResolveFn<any> = (route, state) => {
  const links = inject(LinksService);
  const category = route.queryParams['category'];
  if(category) {
    return links.getLinksByCategory(category).pipe(tap(console.log));
  } 
  return links.getAll()
}

const categoriesResolver: ResolveFn<any> = (route, state) => {
  const links = inject(LinksService);
  return links.getCategories()
}

export const routes: Routes = [
  {
    loadComponent: () => LoginComponent,
    path: '',
    canActivate: [preventAlreadyAuthGuard]
  },
  {
    loadComponent: () => LinksComponent,
    path: 'links',
    resolve: { links: linksResolver, categories: categoriesResolver },
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '' }
];





