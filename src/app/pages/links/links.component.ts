import { Component, Signal, inject, signal } from '@angular/core';
import { LinksService } from '../../services/links.service';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Link } from '../../interfaces/Link';
import { LinkListComponent } from '../../features/links/link-list/link-list.component';
import { LinkFilterComponent } from '../../features/links/link-filter/link-filter.component';
import { LinkDialogComponent } from '../../features/links/link-dialog/link-dialog.component';
import { LinkFormComponent } from '../../features/links/link-form/link-form.component';
import { LinkForm } from '../../models/Link';

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [
    CommonModule,
    LinkListComponent,
    LinkFilterComponent,
    LinkDialogComponent,
    LinkFormComponent
  ],
  templateUrl: './links.component.html',
  styleUrl: './links.component.scss'
})
export class LinksComponent {
  #linksService = inject(LinksService);

  links: Signal<Link[]>;
  selectedLink = signal<Link | undefined>(undefined)
  isOpen = signal(false);
  search = signal('');

  constructor() {
    this.links = toSignal(this.#linksService.getAll(), { initialValue: [] });
  }

  handleEdit(link: Link) {
    console.log('edit', link);
    this.isOpen.set(true);
    this.selectedLink.set(link);
  }

  handleDelete(id: number) {
    console.log('delete', id)
  }

  handleCloseDialog() {
    this.resetDialog();
  }

  handleSave(linkForm: LinkForm) {
    this.resetDialog()
    console.log(linkForm)
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
}
