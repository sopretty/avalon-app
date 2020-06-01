import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { GameService } from '../../services/game/game.service';
import { State } from '../../store/reducers';
import * as selectors from '../../store/reducers/selectors';
import { Game, Player } from '../../types';
import { guessMerlin } from '../../store/actions/actions';

@Component({
  selector: 'app-end-game',
  templateUrl: './end-game.component.html',
  styleUrls: ['./end-game.component.scss'],
  host: { class: 'component-container dynamic-turns' }
})
export class EndGameComponent implements OnInit {

  game: Game;

  selectedPlayer: Player;

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private store: Store<State>) {
  }

  ngOnInit() {
    this.store.pipe(select(selectors.selectGameState)).subscribe(game => this.game = game);
  }

  select(event) {
    this.store.dispatch(guessMerlin({
      gameId: this.game.id,
      playerId: this.game.players.find(player => !!player.assassin).id,
      merlinId: event.value.id
    }));
    this.selectedPlayer = event.value;
  }

  get bluePlayers(): Player[] {
    return this.game.players.filter(player => player.team === 'blue');
  }

  playerRole(id: string): string {
    if (this.game.players[id]) {
      return this.game.players[id].role;
    }
  }

}
