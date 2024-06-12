import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LinkCategoryFull } from '../../../interfaces/Link';

@Component({
  selector: 'app-link-categories',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './link-categories.component.html',
  styleUrl: './link-categories.component.scss'
})
export class LinkCategoriesComponent {
  categories = input.required<LinkCategoryFull[]>();
}
