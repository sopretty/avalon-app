import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { GenericTurnComponent } from '../generic-turn/generic-turn.component';
import { State } from '../../../store/reducers';
import * as selectors from '../../../store/reducers/selectors';
import { getGame, getQuest } from '../../../store/actions/actions';
import { Quest } from '../../../types';

@Component({
  selector: 'app-end-turn',
  templateUrl: './end-turn.component.html',
  styleUrls: ['./end-turn.component.scss'],
  host: { class: 'component-container dynamic-turns' }
})
export class EndTurnComponent extends GenericTurnComponent implements OnInit {

  @Input() state: { gameId: string, questId: number };
  quest: Quest;

  constructor(private _store: Store<State>) {
    super(_store);
  }

  ngOnInit() {
    this._store.dispatch(getQuest({ gameId: this.state.gameId, questId: this.state.questId }));
    this._store.pipe(
      select(selectors.selectGameState),
    ).subscribe(game => {
      if (game.quests && game.quests[this.state.questId] && typeof game.quests[this.state.questId].status === 'boolean') {
        this.quest = game.quests[this.state.questId];
      }
    });
  }

  endTurn() {
    this._store.dispatch(getGame({ gameId: this.state.gameId }));
    this.finished();
  }

}
