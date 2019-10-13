import {createSelector} from '@ngrx/store';
import {GameState, State} from './index';
import {Game} from '../../services/game/game.service';

export const selectGame = (state: State) => state.game;

export const selectGameState = createSelector<State, GameState, Game>(
  selectGame,
  (state: GameState) => state.game
);

export const selectGameId = createSelector<State, GameState, string>(
  selectGame,
  (state: GameState) => state.game.id
);
