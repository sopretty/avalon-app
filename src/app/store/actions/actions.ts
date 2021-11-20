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
  props<Game>()
);

// Result Actions

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

export const startAudioTurn = createAction(
  '[Game Page] Start audio turn',
);
export const getAudio = createAction(
  '[Game Page] Get audio file',
  props<{ gameId: string }>(),
);
export const setAudio = createAction(
  '[Game Page] Set audio file',
  props<{ audio: ArrayBuffer }>()
);

// Global Loading Actions

export const onLoad = createAction('[All Pages] Set loading state');
export const onSuccess = createAction('[All Pages] Set success state');
export const onError = createAction('[All Pages] Set error state');

/// Send & Unsend Loading Actions

export const onLoadUnsend = createAction('[Game Page] Set loading state during unsend');
export const onSuccessUnsend = createAction('[Game Page] Set success state during unsend');
export const onErrorUnsend = createAction('[Game Page] Set error state during unsend');

export const onLoadSend = createAction('[Game Page] Set loading state during send');
export const onSuccessSend = createAction('[Game Page] Set success state during send');
export const onErrorSend = createAction('[Game Page] Set error state during send');

export const onLoadVote = createAction('[Vote Turn] Set loading state during vote');
export const onSuccessVote = createAction('[Vote Turn] Set success state during vote');
export const onErrorVote = createAction('[Vote Turn] Set error state during vote');
