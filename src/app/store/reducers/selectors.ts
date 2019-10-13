import {createSelector} from '@ngrx/store';
import {GameState, State} from './index';

export const selectGame = (state: State) => state.game;

export const selectGameState = createSelector(
  selectGame,
  (state: GameState) => state.game
);
