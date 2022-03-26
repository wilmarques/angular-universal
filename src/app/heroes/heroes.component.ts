import { Component } from '@angular/core';

import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { Hero } from '../hero';

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
      <button
        type="button"
        class="add-button"
        (click)="add(heroName.value); heroName.value = ''"
      >
        Add hero
      </button>
    </div>

    <ul class="heroes">
      <li *ngFor="let hero of heroes$ | async">
        <a routerLink="/detail/{{ hero.id }}">
          <span class="badge">{{ hero.id }}</span> {{ hero.name }}
        </a>
        <button
          type="button"
          class="delete"
          title="delete hero"
          (click)="delete(hero)"
        >
          x
        </button>
      </li>
    </ul>
  `,
  styleUrls: ['heroes.component.scss'],
})
export class HeroesComponent {
  heroes$ = this.heroService.getHeroes();

  constructor(private heroService: HeroService) {}

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as Hero).subscribe((hero) => {
      // this.heroes.push(hero);
    });
  }

  delete(hero: Hero): void {
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
