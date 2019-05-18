import {Component} from '@angular/core';
import {GenericTurnComponent} from '../generic-turn/generic-turn.component';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-role-turn',
  templateUrl: './role-turn.component.html',
  styleUrls: ['./role-turn.component.scss']
})
export class RoleTurnComponent extends GenericTurnComponent {

  constructor(store: Store<{ game: { events: [] } }>) {
    super(store);
  }

}
