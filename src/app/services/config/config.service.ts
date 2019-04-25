import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public players: { name: string }[];
  public roles: { name: string, team: string }[];
  public boardGame: { fail: number, mission: number }[][];

  constructor() {
    this.players = [];
    this.roles = [];
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
