import { Action } from '@ngrx/store';

export enum ActionTypes {
  Add = '[Event Component] ADD',
  Remove = '[Event Component] REMOVE'
}

export class AddEvent implements Action {
  readonly type = ActionTypes.Add;
}

export class DeleteEvent implements Action {
  readonly type = ActionTypes.Remove;
}
