import {Action} from '@ngrx/store';

export enum ActionTypes {
  AddEvents = '[Game Page] Add events',
  ConsumeEvent = '[Game Page] Consume events'
}

export class AddEvents implements Action {
  readonly type = ActionTypes.AddEvents;

  constructor(public payload: { events: Array<{ type: any, state: any }> }) {
  }
}

export class ConsumeEvent implements Action {
  readonly type = ActionTypes.ConsumeEvent;
}

export type ActionsUnion = AddEvents | ConsumeEvent;
