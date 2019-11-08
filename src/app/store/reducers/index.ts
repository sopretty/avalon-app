import { Action, ActionReducerMap, createReducer, MetaReducer, on } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as actions from '../actions/actions';
import { Game } from '../../services/game/game.service';

export interface State {
  game: GameState;
}

export interface Event {
  type: any;
  state?: any;
}

// TODO to be defined
export interface GameState {
  events: Array<Event>;
  game: Game | null;
  audio: ArrayBuffer | null;
}

const initialState: GameState = {
  events: [],
  game: null,
  audio: null
};

const gameReducer = createReducer(
  initialState,
  on(actions.addEvents, (state, { events }) => {
    const resEvents = state.events.slice();
    resEvents.unshift(...events);
    return {
      ...state,
      events: resEvents
    };
  }),
  on(actions.consumeEvents, (state) => {
    const events = state.events;
    events.pop();

    return {
      ...state,
      events: [...events]
    };
  }),
  on(actions.createGameSuccess, (state, game) => ({
    ...state,
    game,
  })),
  on(actions.setAudio, (state, payload) => {
    return ({
      ...state,
      audio: payload.audio
    });
  })
);


export function reducer(state: GameState | undefined, action: Action) {
  return gameReducer(state, action);
}

export const reducers: ActionReducerMap<State> = {
  game: gameReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
