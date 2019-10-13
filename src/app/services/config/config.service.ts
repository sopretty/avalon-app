import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  rules: { nbPlayer: number, blue: number, red: number }[];
  players: { name: string, team: string, roles?: string }[];
  roles: { name: string, team: string }[];
  boardGame: { fail: number, mission: number }[][];

  constructor() {
    this.players = [];
    this.roles = [];
    this.rules = [
      {nbPlayer: 5, blue: 3, red: 2},
      {nbPlayer: 6, blue: 4, red: 2},
      {nbPlayer: 7, blue: 4, red: 3},
      {nbPlayer: 8, blue: 5, red: 3},
      {nbPlayer: 9, blue: 6, red: 3},
      {nbPlayer: 10, blue: 6, red: 4}
    ];
    this.boardGame = [
      [{mission: 2, fail: 1}, {mission: 3, fail: 1}, {mission: 2, fail: 1}, {mission: 3, fail: 1}, {mission: 3, fail: 1}],
      [{mission: 2, fail: 1}, {mission: 3, fail: 1}, {mission: 4, fail: 1}, {mission: 3, fail: 1}, {mission: 4, fail: 1}],
      [{mission: 2, fail: 1}, {mission: 3, fail: 1}, {mission: 3, fail: 1}, {mission: 4, fail: 2}, {mission: 4, fail: 1}],
      [{mission: 3, fail: 1}, {mission: 4, fail: 1}, {mission: 4, fail: 1}, {mission: 5, fail: 2}, {mission: 5, fail: 1}],
      [{mission: 3, fail: 1}, {mission: 4, fail: 1}, {mission: 4, fail: 1}, {mission: 5, fail: 2}, {mission: 5, fail: 1}],
      [{mission: 3, fail: 1}, {mission: 4, fail: 1}, {mission: 4, fail: 1}, {mission: 5, fail: 2}, {mission: 5, fail: 1}],
    ];
  }

}
