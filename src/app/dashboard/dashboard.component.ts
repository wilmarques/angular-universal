import { Component } from '@angular/core';
import { map } from 'rxjs';

import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <h2>Top Heroes</h2>
    <div class="heroes-menu">
      <a
        *ngFor="let hero of heroes$ | async"
        routerLink="/detail/{{ hero.id }}"
      >
        {{ hero.name }}
      </a>
    </div>

    <app-hero-search></app-hero-search>
  `,
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  heroes$ = this.heroService
    .getHeroes()
    .pipe(map((heroes) => heroes.slice(1, 5)));

  constructor(private heroService: HeroService) {}
}
