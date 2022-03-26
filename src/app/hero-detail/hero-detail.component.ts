import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { map, switchMap } from 'rxjs';

import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  template: `
    <div *ngIf="hero$ | async as hero">
      <h2>{{ hero.name | uppercase }} Details</h2>
      <div><span>id: </span>{{ hero.id }}</div>
      <div>
        <label for="hero-name">Hero name: </label>
        <input
          id="hero-name"
          [(ngModel)]="hero.name"
          placeholder="name"
        />
      </div>

      <button
        type="button"
        (click)="goBack()"
      >
        go back
      </button>
      <button
        type="button"
        (click)="save(hero)"
      >
        save
      </button>
    </div>
  `,
  styleUrls: ['hero-detail.component.scss'],
})
export class HeroDetailComponent {
  hero$ = this.route.paramMap
    .pipe(map((paramMap) => Number(paramMap.get('id'))))
    .pipe(switchMap((heroId) => this.heroService.getHero(heroId)));

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
  ) {}

  goBack(): void {
    this.location.back();
  }

  save(hero: Hero): void {
    this.heroService.updateHero(hero).subscribe(() => this.goBack());
  }
}
