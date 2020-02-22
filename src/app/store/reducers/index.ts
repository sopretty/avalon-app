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
const quests: { fail: number, quest: number, status?: boolean }[][] = [
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
        // TODO should be returned by the back-end (here we mock it)
        quests: quests[state.game.players.length - 5],
      }
    }
  })),
  on(actions.setVote, (state, { vote }) => ({
      ...state,
      game: {
        ...state.game,
        board: {
          ...state.game.board,
          quests: state.game.board.quests.map((quest, index) => index === state.game.board.current_quest - 1 ? {
            ...quest,
            status: typeof quest.status !== 'undefined' ? quest.status && vote : vote
          } : quest)
        }
      }
    })
  ),
  on(actions.nextPlayer, (state) => ({
      ...state,
      game: {
        ...state.game,
        board: {
          ...state.game.board,
          current_id_player: state.game.players[
          (state.game.players.findIndex(player => player.id === state.game.board.current_id_player) + 1)
          % state.game.players.length
            ].id
        }
      }
    })
  ),
  on(actions.nextQuest, (state) => ({
    ...state,
    game: {
      ...state.game,
      board: {
        ...state.game.board,
        current_quest: state.game.board.current_quest + 1
      }
    }
  })),
  on(actions.setRejection, (state, { rejection }) => ({
      ...state,
      game: {
        ...state.game,
        board: {
          ...state.game.board,
          nb_mission_unsend: rejection,
        }
      }
    })
  ),
);


export function reducer(state: GameState | undefined, action: Action) {
  return gameReducer(state, action);
}
