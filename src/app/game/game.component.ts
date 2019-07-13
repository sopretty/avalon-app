import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';

import {GameState} from '../store/reducers';
import {ConfigService} from '../services/config/config.service';
import {TurnDirective} from '../dynamicTurns/turn.directive';
import {RoleTurnComponent} from '../dynamicTurns/role-turn/role-turn.component';
import {GenericTurnComponent} from '../dynamicTurns/generic-turn/generic-turn.component';

const turns = {
  'app-role-turn': RoleTurnComponent,
};

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  private boardGame: { fail: number, mission: number }[];

  private events$: Observable<GameState>;

  // @ViewChild(TurnDirective) turnHost: TurnDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef,
              private configService: ConfigService,
              private store: Store<{ game: { events: [] } }>) {
    this.boardGame = this.configService.boardGame[this.configService.players.length];
    store.pipe(
      select('game'),
    ).subscribe(_ => {
      if (_.events.length > 0) {
        this.createCustomEvent(_.events[0]);
      }else{
        viewContainerRef.clear();
      }
    });
  }

  ngOnInit() {
  }

  createCustomEvent(event: { type: any, state: any }) {
    console.log(event);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(turns[event.type]);

    const viewContainerRef = this.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance as GenericTurnComponent).state = event.state;
  }

  /**  createCustomEvent(event: { type: any, state: any }) {
    console.log(event);
    const customElement: NgElement & WithProperties<any> = document.createElement(event.type) as any;

    // customElement.addEventListener('eventFinished', () => document.body.removeChild(customElement));

    if (event.state) {
      Object.keys(event.state).forEach((key) => {
        customElement[key] = event.state[key];
      });
    }

    document.body.appendChild(customElement);
  }**/
}
