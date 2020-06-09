import { Action, createReducer, on } from '@ngrx/store';

import * as actions from '../actions/actions';
import { Game, Rules } from '../../types';

export interface State {
  game: GameState;
}

export interface Event {
  type: any;
  state?: any;
}

export interface GameState {
  events: Array<Event>;
  game: Game | null;
  audio: ArrayBuffer | null;
  loading: boolean | null;
  rules: Rules;
}

const initialState: GameState = {
  events: [],
  game: null,
  audio: null,
  loading: null,
  rules: null,
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
    const events = state.events.slice();
    events.pop();

    return {
      ...state,
      events: [...events]
    };
  }),
  on(actions.setAudio, (state, payload) => {
    return ({
      ...state,
      audio: payload.audio
    });
  }),
  on(actions.setGame, (state, game) => ({
    ...state,
    game: game,
  })),
  on(actions.setQuest, (state, { quest, questId }) => ({
    ...state,
    game: {
      ...state.game,
      quests: state.game.quests.map((questState, index) =>
        index === questId ?
          { ...quest } : { ...questState })
    }
  })),
  on(actions.setRules, (state, { rules }) => ({
    ...state,
    rules: {
      ...state.rules,
      ...rules
    }
  })),
  // Loading states
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
  // Unsend quest Loading
  on(actions.onLoadUnsend, (state) => ({
    ...state,
    game: {
      ...state.game,
      loadingUnsend: true,
    }
  })),
  on(actions.onSuccessUnsend, (state) => ({
    ...state,
    game: {
      ...state.game,
      loadingUnsend: false,
    }
  })),
  on(actions.onErrorUnsend, (state) => ({
    ...state,
    game: {
      ...state.game,
      loadingUnsend: false,
    }
  })),
  // Send quest Loading
  on(actions.onLoadSend, (state) => ({
    ...state,
    game: {
      ...state.game,
      loadingSend: true,
    }
  })),
  on(actions.onSuccessSend, (state) => ({
    ...state,
    game: {
      ...state.game,
      loadingSend: false,
    }
  })),
  on(actions.onErrorSend, (state) => ({
    ...state,
    game: {
      ...state.game,
      loadingSend: false,
    }
  })),
);


export function reducer(state: GameState | undefined, action: Action) {
  return gameReducer(state, action);
}
