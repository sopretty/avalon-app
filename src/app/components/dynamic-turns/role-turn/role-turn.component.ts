import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { GenericTurnComponent } from '../generic-turn/generic-turn.component';
import { State } from '../../../store/reducers';

@Component({
  selector: 'app-role-turn',
  templateUrl: './role-turn.component.html',
  styleUrls: ['./role-turn.component.scss'],
  host: { class: 'component-container dynamic-turns' }
})
export class RoleTurnComponent extends GenericTurnComponent implements OnInit {

  @Input() state: any;
  clicked: boolean;

  constructor(store: Store<State>) {
    super(store);
    this.clicked = false;
  }

  open() {
    if (this.clicked) {
      this.finished();
    }
    this.clicked = true;
  }

  getRole(role: string): string {
    return role.charAt(0).toUpperCase() + role.slice(1);
  }

}
