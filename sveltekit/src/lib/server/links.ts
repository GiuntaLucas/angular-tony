import type { Link, LinkCategoryLight } from "$lib/interfaces/Link";

export async function getCategories(): Promise<LinkCategoryLight[]> {
  const response = await fetch('https://back.flyingpad.be/api/v1/LinkCategories/GetAll');
  const data = await response.json()
  return data.linkCategories;
}

export async function getLinks(categoryId: string | undefined): Promise<Link[]> {
  if (categoryId) {
    const response = await fetch(`https://back.flyingpad.be/api/v1/links/GetByCategory/${categoryId}`);
    const data = await response.json()
    return data.linksListByCategory;
  }
  const response = await fetch('https://back.flyingpad.be/api/v1/links/GetAll');
  const data = await response.json()
  return data.linksList;
}

// getAll() {
//   console.log('RE RUN')
//   return this.#http.get<GetAllLinksResponse>('https://back.flyingpad.be/api/v1/links/GetAll').pipe(map(x => x.linksList));
// }

// getLinksByCategory(categoryId: number) {
//   return this.#http.get<GetLinksByCategoryResponse>(`https://back.flyingpad.be/api/v1/links/GetByCategory/${categoryId}`).pipe(
//     map(response => response.linksListByCategory),
//   )
// }

// delete(linkId: number) {
//   return this.#http.delete<GetAllLinksResponse>(`https://back.flyingpad.be/api/v1/links/delete/${linkId}`);
// }

// createOrUpdate(form: LinkForm, categoryId: string | undefined) {
//   if(form.businessId) {
//     return this.#http.put<GetAllLinksResponse>(`https://back.flyingpad.be/api/v1/links/update`, form);
//   }
//   console.log('selected Category', this.currentCategory())
//   return this.#http.post<GetAllLinksResponse>(`https://back.flyingpad.be/api/v1/links/create`, {...form, categoryId});
