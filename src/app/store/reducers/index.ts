import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../../environments/environment';
import {ActionsUnion, ActionTypes} from '../actions/actions';
import {Game} from '../../services/game/game.service';

export interface State {
  game: any;
}

// TODO to be defined
export interface GameState {
  events: Array<{ type: any, state?: any }>;
  game: Game | null;
}

const initialState: GameState = {
  events: [],
  game: null,
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
      state.events.pop()
      return {
        ...state,
      };

    case ActionTypes.CreateGameSuccess:
      return {
        ...state,
        game: action.payload,
      };

    default:
      return state;
  }
}

export const reducers: ActionReducerMap<State> = {
  game: gameReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
