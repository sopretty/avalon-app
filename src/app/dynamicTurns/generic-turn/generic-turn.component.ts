import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';

import {ConsumeEvent} from '../../store/actions/actions';

@Component({
  selector: 'app-generic-turn',
  templateUrl: './generic-turn.component.html',
  styleUrls: ['./generic-turn.component.scss']
})
export class GenericTurnComponent implements OnInit {

  state: any;

  constructor(private store: Store<{ game: { events: [] } }>) {
  }

  ngOnInit() {
  }

  finished() {
    this.store.dispatch(
      new ConsumeEvent());
  }

}
