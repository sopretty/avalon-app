import {Component, Input, OnInit} from '@angular/core';
import {GenericTurnComponent} from '../generic-turn/generic-turn.component';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-role-turn',
  templateUrl: './role-turn.component.html',
  styleUrls: ['./role-turn.component.scss']
})

export class RoleTurnComponent extends GenericTurnComponent implements OnInit {

  @Input() state: any;
  clicked: boolean;

  constructor(store: Store<{ game: { events: [] } }>) {
    super(store);
    this.clicked = false;
  }

  open() {
    if (this.clicked) {
      this.finished();
    }
    this.clicked = true;
  }

}
