import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { Game, GameService, Player } from '../../services/game/game.service';
import { State } from '../../store/reducers';
import * as selectors from '../../store/reducers/selectors';

@Component({
  selector: 'app-end-game',
  templateUrl: './end-game.component.html',
  styleUrls: ['./end-game.component.scss']
})
export class EndGameComponent implements OnInit {

  private game: Game;

  selectedPlayer: Player;

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private store: Store<State>) {
  }

  ngOnInit() {
    this.store.pipe(select(selectors.selectGameState)).subscribe(game => this.game = game);
  }

  select(player: Player) {
    this.selectedPlayer = player;
  }

  get questStatuses(): { success: number, fail: number } {
    return this.gameService.isGameEnded(this.game.board.quests);
  }

  get bluePlayers(): Player[] {
    return this.game.players.filter(player => player.team === 'blue');
  }

}
