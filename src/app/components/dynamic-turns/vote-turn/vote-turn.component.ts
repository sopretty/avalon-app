import { Component, Input, OnInit } from '@angular/core';
import { GenericTurnComponent } from '../generic-turn/generic-turn.component';
import { Store } from '@ngrx/store';
import { State } from '../../../store/reducers';
import { Player } from '../../../services/game/game.service';
import { setVote } from '../../../store/actions/actions';

@Component({
  selector: 'app-vote-turn',
  templateUrl: './vote-turn.component.html',
  styleUrls: ['./vote-turn.component.scss'],
  host: { class: 'component-container dynamic-turns' }
})
export class VoteTurnComponent extends GenericTurnComponent implements OnInit {

  @Input() state: Player;

  constructor(private _store: Store<State>) {
    super(_store);
  }

  fail() {
    this._store.dispatch(setVote({ vote: false }));
    this.finished();
  }

  success() {
    this._store.dispatch(setVote({ vote: true }));
    this.finished();
  }

}
