import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public nbPlayer: number;
  public roles: {name: string, team: string}[];

  constructor() {
    this.nbPlayer = 5;
    this.roles = [];
  }

}
