import { Pipe, PipeTransform } from "@angular/core";
import { Link } from "../interfaces/Link";

@Pipe({
  name: 'filter',
  pure: false,
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform(links: Link[], term: string): any {
    // I am unsure what id is here. did you mean title?
    return links.filter(link => link.name.toLocaleLowerCase().includes(term.toLocaleLowerCase()));
  }
}