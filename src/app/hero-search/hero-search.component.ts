import { Component } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  template: `
    <div id="search-component">
      <label for="search-box">Hero Search</label>
      <input
        #searchBox
        id="search-box"
        (input)="search(searchBox.value)"
      />

      <ul class="search-result">
        <li *ngFor="let hero of heroes$ | async">
          <a routerLink="/detail/{{ hero.id }}">
            {{ hero.name }}
          </a>
        </li>
      </ul>
    </div>
  `,
  styleUrls: ['./hero-search.component.scss'],
})
export class HeroSearchComponent {
  private searchTerms = new Subject<string>();
  heroes$: Observable<Array<Hero>> = this.searchTerms.pipe(
    // wait 300ms after each keystroke before considering the term
    debounceTime(300),

    // ignore new term if same as previous term
    distinctUntilChanged(),

    // switch to new search observable each time the term changes
    switchMap((term: string) => this.heroService.searchHeroes(term)),
  );

  constructor(private heroService: HeroService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
}
