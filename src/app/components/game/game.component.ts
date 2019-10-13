import {Component, ComponentFactoryResolver, OnInit, ViewContainerRef} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';

import {GameState, Event, State} from '../../store/reducers';
import {ConfigService} from '../../services/config/config.service';
import {RoleTurnComponent} from '../dynamicTurns/role-turn/role-turn.component';
import {GenericTurnComponent} from '../dynamicTurns/generic-turn/generic-turn.component';
import {AudioTurnComponent} from '../dynamicTurns/audio-turn/audio-turn.component';

const turns = {
  'app-role-turn': RoleTurnComponent,
  'app-audio-turn': AudioTurnComponent
};

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  private boardGame: { fail: number, mission: number }[];

  private events$: Observable<GameState>;

  clear: boolean;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef,
              private configService: ConfigService,
              private store: Store<State>) {
    this.clear = false;
    this.boardGame = this.configService.boardGame[this.configService.players.length];
    store.pipe(
      select('game'),
    ).subscribe(_ => {
      this.handleEvent(_);
    });
  }

  ngOnInit() {
  }

  handleEvent(game: GameState) {
    if (game && game.events && game.events.length > 0) {
      this.clear = false;
      this.createCustomEvent(game.events[game.events.length - 1]);
    } else {
      this.viewContainerRef.clear();
      this.clear = true;
    }
  }

  createCustomEvent(event: Event) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(turns[event.type]);

    const viewContainerRef = this.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    if (!!event.state) {
      (componentRef.instance as GenericTurnComponent).state = event.state;
    }
  }
}
