import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';

import {ConsumeEvent} from '../../../store/actions/actions';
import {State} from '../../../store/reducers';

@Component({
  selector: 'app-generic-turn',
  templateUrl: './generic-turn.component.html',
  styleUrls: ['./generic-turn.component.scss']
})
export class GenericTurnComponent implements OnInit {

  state: any;

  constructor(private store: Store<State>) {
  }

  ngOnInit() {
  }

  finished() {
    this.store.dispatch(
      new ConsumeEvent());
  }

}
