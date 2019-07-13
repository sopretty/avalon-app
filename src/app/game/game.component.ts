import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';

import {GameState} from '../store/reducers';
import {ConfigService} from '../services/config/config.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  private boardGame: { fail: number, mission: number }[];

  private events$: Observable<GameState>;

  constructor(private configService: ConfigService, private store: Store<{ game: { events: [] } }>) {
    this.boardGame = this.configService.boardGame[this.configService.players.length];
    store.pipe(
      select('game'),
    ).subscribe(_ => {
      if (_.events.length > 0) {
        this.createCustomEvent(_.events[0]);
      }
    });
  }

  ngOnInit() {
  }

  createCustomEvent(event: { type: any, state: any }) {

  }

  /**  createCustomEvent(event: { type: any, state: any }) {
    console.log(event);
    const customElement: NgElement & WithProperties<any> = document.createElement(event.type) as any;

    // customElement.addEventListener('eventFinished', () => document.body.removeChild(customElement));

    if (event.state) {
      Object.keys(event.state).forEach((key) => {
        customElement[key] = event.state[key];
      });
    }

    document.body.appendChild(customElement);
  }**/
}
