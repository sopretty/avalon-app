import { Component, OnInit } from '@angular/core';
import { Game, Quest } from '../../types';
import { select, Store } from '@ngrx/store';
import * as selectors from '../../store/reducers/selectors';
import { State } from '../../store/reducers';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  host: { class: 'component-container' }
})
export class OverviewComponent implements OnInit {

  game: Game;

  loading = true;

  constructor(private store: Store<State>) {
    store.pipe(select(selectors.selectGameState)).subscribe(game => {
      if (!!game) {
        this.loading = false;
        this.game = game;
      }
    });
  }

  ngOnInit(): void {
  }

  get questsPlayed(): Quest[] {
    return this.game.quests.filter(quest => typeof quest.status === 'boolean');
  }

  get isGameOver(): boolean {
    return !!this.game && !!this.game.result && (!!this.game.result.status
      && !!this.game.result.guess_merlin_id || this.game.result.status === false);
  }

  get guessedMerlin(): string {
    if (this.game.result.guess_merlin_id) {
      return this.game.players.find(player => player.id === this.game.result.guess_merlin_id).name;
    }
    return '';
  }

  hasVoted(questIndex: number, playerId: string): boolean {
    return typeof this.game.quests[questIndex].votes[playerId] === 'boolean';
  }

  getPlayerVote(questIndex: number, playerId: string): boolean {
    return this.game.quests[questIndex].votes[playerId];
  }

}
