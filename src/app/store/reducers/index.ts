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
  loading: boolean | null;
}

const initialState: GameState = {
  events: [],
  game: null,
  audio: null,
  loading: null,
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
  }),
  on(actions.setBoard, (state, { board }) => ({
    ...state,
    game: {
      ...state.game,
      board: {
        ...board,
      }
    }
  })),
  on(actions.setQuest, (state, { quest, questId }) => ({
    ...state,
    game: {
      ...state.game,
      board: {
        ...state.game.board,
        quests: state.game.board.quests.map((questState, index) => index === questId ? {
          ...questState,
          ...quest
        } : questState)
      }
    }
  })),
  // Loading state
  on(actions.onLoad, (state) => ({
    ...state,
    loading: true
  })),
  on(actions.onSuccess, (state) => ({
    ...state,
    loading: false
  })),
  on(actions.onError, (state) => ({
    ...state,
    loading: false
  })),
);


export function reducer(state: GameState | undefined, action: Action) {
  return gameReducer(state, action);
}
