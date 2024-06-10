import { Routes } from '@angular/router';
import { LinksComponent } from './pages/links/links.component';

export const routes: Routes = [
  { loadComponent: () => LinksComponent, path: 'links' }
];
