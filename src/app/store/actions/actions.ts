import { createAction, props } from '@ngrx/store';
import { Event } from '../reducers/index';
import { Game, GameBoard, Player } from '../../services/game/game.service';

export const addEvents = createAction(
  '[Game Page] Add events',
  props<{ events: Array<Event> }>()
);

export const consumeEvents = createAction(
  '[Game Page] Consume events'
);

export const createGame = createAction(
  '[Role Page] Create game'
);

export const createGameSuccess = createAction(
  '[Role Page] Create game Success',
  props<Game>()
);

export const getAudio = createAction(
  '[Game Page] Get audio file',
  props<{ gameId: string }>(),
);

export const setAudio = createAction(
  '[Game Page] Set audio file',
  props<{ audio: ArrayBuffer }>()
);

export const getBoard = createAction(
  '[Game Page] Get the current board',
  props<{ gameId: string }>()
);

export const setBoard = createAction(
  '[Game Page] Set the current board',
  props<{ board: GameBoard }>()
);

