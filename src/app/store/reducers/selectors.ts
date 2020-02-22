import { createSelector } from '@ngrx/store';
import { Event, GameState, State } from './index';
import { Game, GameBoard } from '../../services/game/game.service';

export const selectGame = (state: State) => state.game;

export const selectGameState = createSelector<State, GameState, Game>(
  selectGame,
  (state: GameState) => state.game
);

export const selectGameId = createSelector<State, GameState, string>(
  selectGame,
  (state: GameState) => state.game.id
);

export const selectAudio = createSelector<State, GameState, ArrayBuffer | null>(
  selectGame,
  (state: GameState) => state.audio
);

export const selectEvents = createSelector<State, GameState, Array<Event>>(
  selectGame,
  (state: GameState) => state.events
);

export const selectBoard = createSelector<State, GameState, GameBoard>(
  selectGame,
  (state: GameState) => state.game.board
);


