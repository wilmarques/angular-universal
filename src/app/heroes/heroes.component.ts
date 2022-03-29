import { Component } from '@angular/core';

import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { HeroesStore } from './heroes.store';
import { ComponentStore } from '@ngrx/component-store';
import { map } from 'rxjs';

@Component({
  selector: 'app-heroes',
  template: `
    <h2>My Heroes</h2>

    <div>
      <label for="new-hero">Hero name: </label>
      <input
        id="new-hero"
        #heroName
      />
      <!-- (click) passes input value to add() and then clears the input -->
      <!-- <button
        type="button"
        class="add-button"
        (click)="add(heroName.value); heroName.value = ''"
      >
        Add hero
      </button> -->
    </div>

    <ul class="heroes">
      <li *ngFor="let hero of heroes$ | async">
        <a routerLink="/detail/{{ hero.id }}">
          <span class="badge">{{ hero.id }}</span> {{ hero.name }}
        </a>
        <!-- <button
          type="button"
          class="delete"
          title="delete hero"
          (click)="delete(hero)"
        >
          x
        </button> -->
      </li>
    </ul>
  `,
  styleUrls: ['heroes.component.scss'],
  providers: [HeroesStore],
})
export class HeroesComponent {
  readonly heroes$ = this.store.state$.pipe(
    map((state) => state.heroes),
  );

  constructor(private readonly store: HeroesStore) {}

  /*add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as Hero).subscribe((hero) => {
      // this.heroes.push(hero);
    });
  }

  delete(hero: Hero) {
    this.heroService.deleteHero(hero.id).subscribe();
  }*/
}
