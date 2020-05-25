import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

export interface PutPlayerBody {
  names: string[];
  roles: string[];
}

export interface Player {
  id: string;
  ind_player: number;
  name: string;
  role: string;
  team: string;
}

export interface Game {
  id: string;
  players: Player[];
  board?: GameBoard;
}

export interface GameBoard {
  current_id_player: string;
  current_ind_player: number;
  current_name_player: string;
  current_quest: number;
  quests: { fail: number, quest: number, status?: boolean }[];
  nb_mission_unsend: number;
}

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
    return this._http.get(`${environment.apiUrl}${gameId}/mp3`,
      { responseType: 'arraybuffer' });
  }

  getBoard(gameId: string): Observable<GameBoard> {
    return this._http.get<GameBoard>(`${environment.apiUrl}${gameId}/board`);
  }


  isGameEnded(quests: { fail: number, quest: number, status?: boolean }[]): { fail: number, success: number } {
    return quests.reduce((acc, curr) => {
      if (typeof curr.status === 'boolean') {
        if (curr.status) {
          return { fail: acc.fail, success: acc.success + 1 };
        } else {
          return { fail: acc.fail + 1, success: acc.success };
        }
      }
      return acc;
    }, { fail: 0, success: 0 });
  }
}
