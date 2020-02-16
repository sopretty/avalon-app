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


// TODO demander à romain de retourner ce genre d'objet
const quests: { fail: number, quest: number }[][] = [
  [{ quest: 2, fail: 1 }, { quest: 3, fail: 1 }, { quest: 2, fail: 1 }, { quest: 3, fail: 1 }, { quest: 3, fail: 1 }],
  [{ quest: 2, fail: 1 }, { quest: 3, fail: 1 }, { quest: 4, fail: 1 }, { quest: 3, fail: 1 }, { quest: 4, fail: 1 }],
  [{ quest: 2, fail: 1 }, { quest: 3, fail: 1 }, { quest: 3, fail: 1 }, { quest: 4, fail: 2 }, { quest: 4, fail: 1 }],
  [{ quest: 3, fail: 1 }, { quest: 4, fail: 1 }, { quest: 4, fail: 1 }, { quest: 5, fail: 2 }, { quest: 5, fail: 1 }],
  [{ quest: 3, fail: 1 }, { quest: 4, fail: 1 }, { quest: 4, fail: 1 }, { quest: 5, fail: 2 }, { quest: 5, fail: 1 }],
  [{ quest: 3, fail: 1 }, { quest: 4, fail: 1 }, { quest: 4, fail: 1 }, { quest: 5, fail: 2 }, { quest: 5, fail: 1 }],
];

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
  }),
  on(actions.setBoard, (state, { board }) => ({
    ...state,
    game: {
      ...state.game,
      board: {
        ...board,
        quests: quests[state.game.players.length],
      }
    }
  }))
);


export function reducer(state: GameState | undefined, action: Action) {
  return gameReducer(state, action);
}
