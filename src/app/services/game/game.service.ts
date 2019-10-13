import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
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

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private _http: HttpClient) {
  }

  createGame(players: PutPlayerBody): Observable<Game> {
     return this._http.put<Game>(environment.apiUrl + environment.endpoints.createGame, players);
  }

  getAudio(gameId: string): Observable<any> {
    return this._http.get(environment.apiUrl + gameId + '/mp3',
    { responseType: 'arraybuffer'});
  }
}
