import { Component, Signal, effect, inject, input, signal } from '@angular/core';
import { LinksService } from '../../services/links.service';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Link, LinkCategoryFull } from '../../interfaces/Link';
import { LinkListComponent } from '../../features/links/link-list/link-list.component';
import { LinkFilterComponent } from '../../features/links/link-filter/link-filter.component';
import { LinkDialogComponent } from '../../features/links/link-dialog/link-dialog.component';
import { LinkFormComponent } from '../../features/links/link-form/link-form.component';
import { LinkForm } from '../../models/Link';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LinkCategoriesComponent } from '../../features/links/link-categories/link-categories.component';

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
  #router = inject(Router);
  #linksService = inject(LinksService)
  links = input<Link[]>([]);
  categories = input<LinkCategoryFull[]>([]);
  selectedLink = signal<Link | undefined>(undefined)
  isOpen = signal(false);
  search = signal('');

  handleEdit(link: Link) {
    this.isOpen.set(true);
    this.selectedLink.set(link);
    this.reload();
  }

  handleDelete(id: number) {
    this.#linksService.delete(id).subscribe(() => this.reload());
  }
  handleSave(linkForm: LinkForm) {
    this.resetDialog();
    this.reload();
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
    const {pathname, search} = window.location;
    const currentUrl = `${pathname}${search}`;
    this.#router.navigateByUrl(currentUrl)
  }
}
