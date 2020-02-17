import { Component, ComponentFactoryResolver, OnInit, ViewContainerRef } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Event, State } from '../../store/reducers';
import { ConfigService } from '../../services/config/config.service';
import { RoleTurnComponent } from '../dynamicTurns/role-turn/role-turn.component';
import { GenericTurnComponent } from '../dynamicTurns/generic-turn/generic-turn.component';
import { AudioTurnComponent } from '../dynamicTurns/audio-turn/audio-turn.component';
import * as selectors from '../../store/reducers/selectors';
import { addEvents, getBoard } from '../../store/actions/actions';
import { ActivatedRoute } from '@angular/router';
import { Game, GameBoard, Player } from '../../services/game/game.service';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { VoteTurnComponent } from '../dynamicTurns/vote-turn/vote-turn.component';

const turns = {
  'app-role-turn': RoleTurnComponent,
  'app-audio-turn': AudioTurnComponent,
  'app-vote-turn': VoteTurnComponent
};

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  static voteNumber = 5;

  private game: Game;

  clear: boolean;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef,
              private configService: ConfigService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private store: Store<State>) {
    this.clear = false;

    store.pipe(
      select(selectors.selectEvents),
    ).subscribe(events => {
      this.handleEvent(events);
    });

    store.pipe(select(selectors.selectGameState)).subscribe(game => this.game = game);

  }

  ngOnInit() {
    this.store.dispatch(getBoard({ gameId: this.route.snapshot.params.id }));
  }

  handleEvent(events: Event[]) {
    if (events && events.length > 0) {
      this.clear = false;
      this.createCustomEvent(events[events.length - 1]);
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

  openPlayerDialog() {
    console.log(this.board.quests, this.board.current_quest)
    const dialogRef = this.dialog.open(DialogComponent, {
      disableClose: true,
      width: '250px',
      data: { players: this.players, pickNumber: this.board.quests[this.board.current_quest - 1].quest }
    });

    dialogRef.afterClosed().subscribe((playersSelected: Player[]) => {
      this.store.dispatch(addEvents({
        events: playersSelected.map(player => ({ type: 'app-vote-turn', state: player }))
      }));
    });
  }


  get voteNumber() {
    return Array(GameComponent.voteNumber);
  }

  get board(): GameBoard {
    return this.game.board;
  }

  get players(): Player[] {
    return this.game.players;
  }

  get currentPlayer(): Player {
    // TODO les ids ne match pas, du coup je retourne le premier mais à enlever !
    return this.players.find(player => player.id === this.board.current_id_player) || this.players[0];
  }
}
