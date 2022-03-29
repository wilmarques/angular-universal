import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

export interface HeroesState {
  heroes: Array<Hero>;
}

const defaultState: HeroesState = {
  heroes: [],
};

@Injectable()
export class HeroesStore extends ComponentStore<HeroesState> {
  constructor(private heroService: HeroService) {
    super(defaultState);
  }

  readonly heroes$ = this.select(({ heroes }) => heroes);

  readonly loadHeroes = this.updater((state, Array<Hero> | null) => ({
    ...state,
    hero: hero || [],
  }));
}
