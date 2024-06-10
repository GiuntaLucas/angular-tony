import { Routes } from '@angular/router';
import { LinksComponent } from './pages/links/links.component';
import { inject } from '@angular/core';
import { LinksService } from './services/links.service';

export const routes: Routes = [
  {
    loadComponent: () => LinksComponent, path: 'links',
    resolve: { links: () => inject(LinksService).getAll() },
    runGuardsAndResolvers: 'always'
  }
];


