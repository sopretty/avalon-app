import { Component } from '@angular/core';
import { GenericTurnComponent } from '../generic-turn/generic-turn.component';
import { select, Store } from '@ngrx/store';
import { State } from '../../../store/reducers';
import * as selectors from '../../../store/reducers/selectors';
import { GameBoard } from '../../../services/game/game.service';
import { nextPlayer, nextQuest } from '../../../store/actions/actions';

@Component({
  selector: 'app-end-turn',
  templateUrl: './end-turn.component.html',
  styleUrls: ['./end-turn.component.scss']
})
export class EndTurnComponent extends GenericTurnComponent {

  board: GameBoard;

  constructor(private _store: Store<State>) {
    super(_store);

    _store.pipe(
      select(selectors.selectBoard),
    ).subscribe(board => this.board = board);
  }

  endTurn() {
    this._store.dispatch(nextQuest())
    this._store.dispatch(nextPlayer())
    this.finished();
  }

}
