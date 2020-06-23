import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Event, State } from '../../store/reducers';
import { RoleTurnComponent } from '../dynamic-turns/role-turn/role-turn.component';
import { GenericTurnComponent } from '../dynamic-turns/generic-turn/generic-turn.component';
import { AudioTurnComponent } from '../dynamic-turns/audio-turn/audio-turn.component';
import * as selectors from '../../store/reducers/selectors';
import { createQuest, questUnsend } from '../../store/actions/actions';
import { GameService } from '../../services/game/game.service';
import { DialogComponent } from './dialog/dialog.component';
import { VoteTurnComponent } from '../dynamic-turns/vote-turn/vote-turn.component';
import { EndTurnComponent } from '../dynamic-turns/end-turn/end-turn.component';
import { Game, Player } from '../../types';
import { RoleDialogComponent } from './role-dialog/role-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { QuestDialogComponent } from './quest-dialog/quest-dialog.component';

const turns = {
  'app-role-turn': RoleTurnComponent,
  'app-audio-turn': AudioTurnComponent,
  'app-vote-turn': VoteTurnComponent,
  'app-end-turn': EndTurnComponent
};

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  host: { class: 'component-container' }
})
export class GameComponent {

  static voteNumber = 5;

  game: Game;

  globalLoading: boolean;

  clear: boolean;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef,
              private dialog: MatDialog,
              private translateService: TranslateService,
              private store: Store<State>) {
    this.clear = false;

    store.pipe(
      select(selectors.selectEvents),
    ).subscribe(events => {
      this.handleEvent(events);
    });

    store.pipe(
      select(selectors.selectLoading),
    ).subscribe(loading => {
      this.globalLoading = loading;
    });

    store.pipe(select(selectors.selectGameState)).subscribe(game => {
      this.game = game;
    });
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
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { players: this.players, pickNumber: this.game.quests[this.game.current_quest].nb_players_to_send }
    });

    dialogRef.afterClosed().subscribe((playersSelected: Player[]) => {
      if (playersSelected) {
        this.store.dispatch(createQuest({
          gameId: this.game.id,
          players: playersSelected,
          questId: this.game.current_quest
        }));
      }

    });
  }

  openRoleDialog() {
    this.dialog.open(RoleDialogComponent, {
      width: '300px',
      data: { players: this.players },
      autoFocus: false,
    });
  }

  openQuestDialog(questIndex: number): void {
    this.dialog.open(QuestDialogComponent, {
      data: { players: this.players, quest: this.game.quests[questIndex] },
      autoFocus: false,
    });
  }

  questClick(questIndex: number): void {
    if (questIndex === this.game.current_quest) {
      this.openPlayerDialog();
    } else if (questIndex < this.game.current_quest) {
      this.openQuestDialog(questIndex);
    }
  }

  questFailed(index: number): boolean {
    return typeof this.game.quests[index].status === 'boolean' && !this.game.quests[index].status;
  }

  questSucceed(index: number): boolean {
    return typeof this.game.quests[index].status === 'boolean' && this.game.quests[index].status;
  }

  nextTurn() {
    this.store.dispatch(questUnsend({ gameId: this.game.id }));
  }

  getQuestTooltip(questIndex: number) {
    if (questIndex === this.game.current_quest) {
      return this.translateService.instant('GAME.startQuestTooltip');
    } else if (questIndex < this.game.current_quest) {
      return this.translateService.instant('GAME.questInfoTooltip');
    }
  }

  get voteNumber() {
    return Array(GameComponent.voteNumber);
  }

  get players(): Player[] {
    return this.game.players;
  }

  get currentPlayer(): Player {
    return this.players.find(player => player.id === this.game.current_id_player) || this.players[0];
  }

}
