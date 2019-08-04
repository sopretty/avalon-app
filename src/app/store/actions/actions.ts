import {Action} from '@ngrx/store';
import {Game} from '../../services/game/game.service';

export enum ActionTypes {
  AddEvents = '[Game Page] Add events',
  ConsumeEvent = '[Game Page] Consume events',
  CreateGame = '[Role Page] Create game',
  CreateGameSuccess = '[Role Page] Create game Success'
}

export class AddEvents implements Action {
  readonly type = ActionTypes.AddEvents;

  constructor(public payload: { events: Array<{ type: any, state?: any }> }) {
  }
}

export class ConsumeEvent implements Action {
  readonly type = ActionTypes.ConsumeEvent;
}

export class CreateGame implements Action {
  readonly type = ActionTypes.CreateGame;
}

export class CreateGameSuccess implements Action {
  readonly type = ActionTypes.CreateGameSuccess;

  constructor(public payload: Game) {
  }
}

export type ActionsUnion = AddEvents | ConsumeEvent | CreateGameSuccess;
