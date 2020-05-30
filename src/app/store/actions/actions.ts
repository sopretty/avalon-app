import { createAction, props } from '@ngrx/store';

import { Game, GameBoard, Player, QuestResult } from '../../services/game/game.service';
import { Event } from '../reducers';

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

export const setVote = createAction(
  '[Game Page] Set a vote',
  props<{ gameId: string, playerId: string, questId: number, vote: boolean }>()
);

export const questUnsend = createAction(
  '[Game Page] New quest unsend',
  props<{ gameId: string }>()
);

export const createQuest = createAction(
  '[Game Page] Create new quest',
  props<{ gameId: string, questId: number, players: Player[] }>()
);

export const getQuest = createAction(
  '[End Turn] Fetch the quest',
  props<{ gameId: string, questId: number }>()
);

export const setQuest = createAction(
  '[End Turn] Set the quest',
  props<{ quest: QuestResult, questId: number }>()
);

// Loading Actions

export const onLoad = createAction('[All Pages] Set loading state');
export const onSuccess = createAction('[All Pages] Set success state');
export const onError = createAction('[All Pages] Set error state');
