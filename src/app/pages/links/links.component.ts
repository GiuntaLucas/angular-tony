import { Component, Signal, inject } from '@angular/core';
import { LinksService } from '../../services/links.service';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Link } from '../../interfaces/Link';
import { LinkListComponent } from '../../features/links/link-list/link-list.component';

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [
    CommonModule,
    LinkListComponent
  ],
  templateUrl: './links.component.html',
  styleUrl: './links.component.scss'
})
export class LinksComponent {
  #linksService = inject(LinksService);

  links: Signal<Link[]>;

  constructor() {
    this.links = toSignal(this.#linksService.getAll(), { initialValue: [] });
   }

   handleEdit(link: Link) {
    console.log('edit', link)
   }

   handleDelete(id: number) {
    console.log('delete', id)
   }
}
