import { Component, Input, OnInit } from '@angular/core';
import { GenericTurnComponent } from '../generic-turn/generic-turn.component';
import { Store } from '@ngrx/store';
import { State } from '../../../store/reducers';
import { Player } from '../../../services/game/game.service';

@Component({
  selector: 'app-vote-turn',
  templateUrl: './vote-turn.component.html',
  styleUrls: ['./vote-turn.component.scss']
})
export class VoteTurnComponent extends GenericTurnComponent implements OnInit {

  @Input() state: Player;

  constructor(store: Store<State>) {
    super(store);
  }

  open() {
    this.finished();
  }

}
