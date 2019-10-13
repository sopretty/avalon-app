import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../../environments/environment';

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
}

export interface GameBoard {
  'current_id_player': string;
  'current_ind_player': number;
  'current_name_player': string;
  'current_quest': number;
  'nb_echec_to_fail': {
    'echec1': number;
    'echec2': number;
    'echec3': number;
    'echec4': number;
    'echec5': number;
  };
  'nb_mission_unsend': number;
  'nb_player_to_send': {
    'quest1': number;
    'quest2': number;
    'quest3': number;
    'quest4': number;
    'quest5': number;
  };
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
      {responseType: 'arraybuffer'});
  }


  getBoard(gameId: string): Observable<GameBoard> {
    return this._http.get<GameBoard>(`${environment.apiUrl}${gameId}/board`);
  }
}
