import {Action, ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {ActionTypes} from '../actions/actions';

export interface State {
  game: any;
}

export interface GameState {
  events: [];
}

const initialState: GameState = {
  events: [],
};

function gameReducer(state = initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.Add:
      return {
        ...state.events,
        events: state.events.concat([])
      };

    case ActionTypes.Remove:
      return {
        ...state.events,
        events: state.events.concat([])
      };

    default:
      return state;
  }
}

export const reducers: ActionReducerMap<State> = {
  game: gameReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
