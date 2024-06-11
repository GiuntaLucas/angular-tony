import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, of, tap } from 'rxjs';
import { GetAllLinkCategoriesResponse, GetAllLinksResponse, GetLinksByCategoryResponse, LinkForm } from '../models/Link';
import { LinkCategoryLight } from '../interfaces/Link';

@Injectable({
  providedIn: 'root'
})
export class LinksService {
  #http = inject(HttpClient);

  #categories: LinkCategoryLight[] = [];
  constructor() { }

  getCategories() {
    if(this.#categories.length > 0) return of(this.#categories);
    return this.#http.get<GetAllLinkCategoriesResponse>('https://back.flyingpad.be/api/v1/LinkCategories/GetAll').pipe(
      map(x => x.linkCategories),
      tap(categories => this.#categories = categories)
    );
  }

  getAll() {
    console.log('RE RUN')
    return this.#http.get<GetAllLinksResponse>('https://back.flyingpad.be/api/v1/links/GetAll').pipe(map(x => x.linksList));
  }

  getLinksByCategory(categoryId: number) {
    return this.#http.get<GetLinksByCategoryResponse>(`https://back.flyingpad.be/api/v1/links/GetByCategory/${categoryId}`).pipe(
      map(response => response.linksListByCategory),
    )
  }

  delete(linkId: number) {
    return this.#http.delete<GetAllLinksResponse>(`https://back.flyingpad.be/api/v1/links/delete/${linkId}`);
  }

  createOrUpdate(form: LinkForm) {
    if(form.businessId) {
      return this.#http.put<GetAllLinksResponse>(`https://back.flyingpad.be/api/v1/links/update`, form);
    }
    return this.#http.post<GetAllLinksResponse>(`https://back.flyingpad.be/api/v1/links/create`, form);
  }
}
