import {Component, OnInit} from '@angular/core';
import {ConfigService} from '../services/config/config.service';
import {Observable} from 'rxjs';
import {GameState} from '../reducers';
import {select, Store} from '@ngrx/store';
import {tap} from 'rxjs/operators';

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
      tap(_ => console.log(_))
    ).subscribe();
  }

  ngOnInit() {
  }
}
