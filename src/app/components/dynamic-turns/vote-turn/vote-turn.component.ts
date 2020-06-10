import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as selectors from '../../../store/reducers/selectors';
import { GenericTurnComponent } from '../generic-turn/generic-turn.component';
import { State } from '../../../store/reducers';
import { setVote } from '../../../store/actions/actions';
import { Player } from '../../../types';

@Component({
  selector: 'app-vote-turn',
  templateUrl: './vote-turn.component.html',
  styleUrls: ['./vote-turn.component.scss'],
  host: { class: 'component-container dynamic-turns' }
})
export class VoteTurnComponent extends GenericTurnComponent implements OnInit {

  @Input() state: { player: Player, gameId: string, questId: number };

  buttonOrder: boolean;

  loading: boolean;

  constructor(private _store: Store<State>) {
    super(_store);
    this.buttonOrder = !!Math.floor(Math.random() * 2);
    this.loading = true;
    _store.pipe(
      select(selectors.selectGameState),
    ).subscribe(game => {
        this.loading = game.loadingVote;
    });
  }

  fail() {
    this._store.dispatch(setVote({ gameId: this.state.gameId, questId: this.state.questId, playerId: this.state.player.id, vote: false }));
  }

  success() {
    this._store.dispatch(setVote({ gameId: this.state.gameId, questId: this.state.questId, playerId: this.state.player.id, vote: true }));
  }

}
