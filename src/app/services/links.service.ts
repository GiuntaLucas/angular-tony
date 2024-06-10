import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { GetAllLinkCategoriesResponse, GetAllLinksResponse } from '../models/Link';

@Injectable({
  providedIn: 'root'
})
export class LinksService {
  #http = inject(HttpClient);

  constructor() { }

  getCategories() {
    return this.#http.get<GetAllLinkCategoriesResponse>('https://back.flyingpad.be/api/v1/LinkCategories/GetAll').pipe(map(x => x.linkCategories));
  }

  getAll() {
    console.log('RE RUN')
    return this.#http.get<GetAllLinksResponse>('https://back.flyingpad.be/api/v1/links/GetAll').pipe(map(x => x.linksList));
  }
}
