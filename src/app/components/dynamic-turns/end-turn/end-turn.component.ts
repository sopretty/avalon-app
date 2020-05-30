import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { GenericTurnComponent } from '../generic-turn/generic-turn.component';
import { State } from '../../../store/reducers';
import * as selectors from '../../../store/reducers/selectors';
import { getQuest } from '../../../store/actions/actions';
import { Quest } from '../../../services/game/game.service';

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
      select(selectors.selectBoard),
    ).subscribe(board => {
      if (board.quests && board.quests[this.state.questId] && typeof board.quests[this.state.questId].status === 'boolean') {
        this.quest = board.quests[this.state.questId];
      }
    });
  }

  endTurn() {
    this.finished();
  }

}
