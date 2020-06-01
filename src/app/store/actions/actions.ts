import { createAction, props } from '@ngrx/store';

import { Event } from '../reducers';
import { Game, GameResult, Player, QuestResult, Rules } from '../../types';

// Events Actions

export const addEvents = createAction(
  '[Game Page] Add events',
  props<{ events: Array<Event> }>()
);
export const consumeEvents = createAction(
  '[Game Page] Consume events'
);

// Game Actions

export const createGame = createAction(
  '[Role Page] Create game'
);
export const getGame = createAction(
  '[Game Page] Get the current game',
  props<{ gameId: string }>()
);
export const setGame = createAction(
  '[Game Page] Set the current game',
  props<{ game: Game }>()
);

// Result Actions

export const setResult = createAction(
  '[End Page] Set the end result',
  props<{ gameResult: GameResult }>()
);
export const guessMerlin = createAction(
  '[End Page] Set the current game',
  props<{ gameId: string, playerId: string, merlinId: string }>()
);

// Quests Actions

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
export const setVote = createAction(
  '[Game Page] Set a vote',
  props<{ gameId: string, playerId: string, questId: number, vote: boolean }>()
);

// Config Actions

export const getRules = createAction(
  '[Init App] Get the rules',
);
export const setRules = createAction(
  '[Init App] set the rules',
  props<{ rules: Rules }>()
);

// Audio Actions

export const getAudio = createAction(
  '[Game Page] Get audio file',
  props<{ gameId: string }>(),
);
export const setAudio = createAction(
  '[Game Page] Set audio file',
  props<{ audio: ArrayBuffer }>()
);

// Loading Actions

export const onLoad = createAction('[All Pages] Set loading state');
export const onSuccess = createAction('[All Pages] Set success state');
export const onError = createAction('[All Pages] Set error state');
