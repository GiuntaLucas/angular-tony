import { Component, effect, input, output } from '@angular/core';
import { Link } from '../../../interfaces/Link';

@Component({
  selector: 'app-link-list',
  standalone: true,
  imports: [],
  templateUrl: './link-list.component.html',
  styleUrl: './link-list.component.scss'
})
export class LinkListComponent {
  links = input.required<Link[]>();
  edit = output<Link>();
  delete = output<number>();

  constructor() {
    effect(() => console.log(`Nb links: ${this.links().length}`))
  }

  handleEdit(link: Link) {
    this.edit.emit(link);
  }

  handleDelete(id: number) {
    this.delete.emit(id);
  }
}
