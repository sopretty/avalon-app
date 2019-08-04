import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

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
    return of({
      id: 'id',
      players: [
        {
          id: 'id1',
          ind_player: 1,
          name: 'Mathieu',
          role: 'Oberon',
          team: 'red',
        },
        {
          id: 'id2',
          ind_player: 2,
          name: 'Romain',
          role: 'Merlin',
          team: 'blue',
        },
      ]
    });
    // return this._http.put<Game>(environment.apiUrl + environment.endpoints.createGame, players);
  }
}
