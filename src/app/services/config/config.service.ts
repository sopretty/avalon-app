import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public players: { name: string }[];
  public roles: {name: string, team: string}[];

  constructor() {
    this.players = [];
    this.roles = [];
  }

}
