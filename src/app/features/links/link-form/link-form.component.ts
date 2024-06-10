import { Component, input } from '@angular/core';
import { Link } from '../../../interfaces/Link';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-link-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './link-form.component.html',
  styleUrl: './link-form.component.scss'
})
export class LinkFormComponent {
  link = input<Link>();
}
