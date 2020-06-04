import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Game, GameResult, PutPlayerBody, QuestResult } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private _http: HttpClient) {
  }

  createGame(players: PutPlayerBody): Observable<Game> {
    return this._http.put<Game>(environment.apiUrl + environment.endpoints.createGame, players);
  }

  getAudio(gameId: any): Observable<ArrayBuffer> {
    return this._http.get(`${environment.apiUrl}games/${gameId}/mp3`,
      { responseType: 'arraybuffer' });
  }

  getGame(gameId: string): Observable<Game> {
    return this._http.get<Game>(`${environment.apiUrl}games/${gameId}`);
  }

  questUnsend(gameId: string): Observable<Game> {
    return this._http.post<Game>(`${environment.apiUrl}games/${gameId}/quest_unsend`, undefined);
  }

  setVote(gameId: string, questId: number, playerId: string, vote: boolean): Observable<void> {
    return this._http.post<void>(`${environment.apiUrl}games/${gameId}/quests/${questId}`, { [playerId]: vote });
  }

  createQuest(gameId: string, questId: number, playerIds: string[]): Observable<void> {
    return this._http.put<void>(`${environment.apiUrl}games/${gameId}/quests/${questId}`, playerIds);
  }

  getQuest(gameId: string, questId: number): Observable<QuestResult> {
    return this._http.get<QuestResult>(`${environment.apiUrl}games/${gameId}/quests/${questId}`);
  }

  guessMerlin(gameId: string, playerId: string, merlinId: string): Observable<GameResult> {
    return this._http.post<GameResult>(`${environment.apiUrl}games/${gameId}/guess_merlin`, { [playerId]: merlinId });
  }

}
