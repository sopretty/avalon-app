import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../../environments/environment';
import {ActionsUnion, ActionTypes} from '../actions/actions';

export interface State {
  game: any;
}

// TODO to be defined
export interface GameState {
  events: Array<{ type: any, state: any }>;
}

const initialState: GameState = {
  events: [],
};

function gameReducer(state = initialState, action: ActionsUnion) {
  switch (action.type) {
    case ActionTypes.AddEvents:
      const resEvents = state.events.slice();
      resEvents.unshift(...action.payload.events);
      return {
        ...state,
        events: resEvents
      };

    case ActionTypes.ConsumeEvent:
      return {
        ...state,
        events: state.events.splice(0, 1)
      };

    default:
      return state;
  }
}

export const reducers: ActionReducerMap<State> = {
  game: gameReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
