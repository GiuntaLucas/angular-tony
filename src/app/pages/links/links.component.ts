import { Component, Signal, computed, effect, inject, input, signal } from '@angular/core';
import { LinksService } from '../../services/links.service';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Link, LinkCategoryFull, LinkCategoryLight } from '../../interfaces/Link';
import { LinkListComponent } from '../../features/links/link-list/link-list.component';
import { LinkFilterComponent } from '../../features/links/link-filter/link-filter.component';
import { LinkDialogComponent } from '../../features/links/link-dialog/link-dialog.component';
import { LinkFormComponent } from '../../features/links/link-form/link-form.component';
import { LinkForm } from '../../models/Link';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LinkCategoriesComponent } from '../../features/links/link-categories/link-categories.component';
import { BehaviorSubject, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [
    CommonModule,
    LinkListComponent,
    LinkFilterComponent,
    LinkDialogComponent,
    LinkFormComponent,
    LinkCategoriesComponent,
    RouterModule
  ],
  templateUrl: './links.component.html',
  styleUrl: './links.component.scss'
})
export class LinksComponent {
  #refresh$ = new BehaviorSubject('');
  #activatedRoute = inject(ActivatedRoute);
  #linksService = inject(LinksService)
  idParam: Signal<string | undefined>
  links: Signal<Link[]>;
  categories: Signal<LinkCategoryLight[]>;
  selectedLink = signal<Link | undefined>(undefined);
  selectedCategory = computed(() => this.categories().find(x => x.businessId.toString() === this.idParam() || undefined))
  isOpen = signal(false);
  search = signal('');

  constructor() {
    const queryParams$ = this.#activatedRoute.queryParams.pipe(
      map(params => params['category'])
    );
    const fetchLinks$ = this.#refresh$.pipe(
      switchMap(() => queryParams$),
      switchMap((id: string | undefined) => {
        if (id) {
          return this.#linksService.getLinksByCategory(id);
        }
        return this.#linksService.getAll();
      })
    );

    this.idParam = toSignal(queryParams$);
    this.links = toSignal(fetchLinks$, { initialValue: [] })
    this.categories = toSignal(this.#linksService.getCategories(), { initialValue: [] });
  }

  handleEdit(link: Link) {
    this.isOpen.set(true);
    this.selectedLink.set(link);
  }

  handleDelete(id: string) {
    this.#linksService.delete(id).subscribe(() => this.reload());
  }
  handleSave(linkForm: LinkForm) {
    this.resetDialog();
    const id = this.selectedCategory() ? this.selectedCategory()!.businessId.toString() : undefined;
    this.#linksService.createOrUpdate(linkForm, id).subscribe(() => this.reload());
  }

  handleCloseDialog() {
    this.resetDialog();
  }


  handleSearch(value: string) {
    this.search.set(value)
  }

  toggleDialog() {
    this.isOpen.update(x => !x);
  }

  private resetDialog() {
    this.isOpen.set(false);
    this.selectedLink.set(undefined);
  }

  private reload() {
    this.#refresh$.next('')
  }
}
