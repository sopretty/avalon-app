import { Component, Input, OnInit } from '@angular/core';
import { Store} from '@ngrx/store';

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

  preventSingleClick = false;
  timer: any;
  delay: number;

  constructor(store: Store<State>) {
    super(store);
    this.delay = 200;
    this.clicked = false;
  }

  singleClick() {
    this.preventSingleClick = false;
      this.timer = setTimeout(() => {
        if (!this.preventSingleClick) {
           //Navigate on single click
        }
      }, this.delay);
  }

  doubleClick () {
    this.preventSingleClick = true;
    clearTimeout(this.timer);
    this.open();
  }

  open() {
    if (this.clicked) {
      this.finished();
    }
    this.clicked = true;
  }

}
