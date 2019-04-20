import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private _rules: { nbPlayer: number, blue: number, red: number }[];

  constructor() {
    this._rules = [
      {nbPlayer: 5, blue: 3, red: 2},
      {nbPlayer: 6, blue: 4, red: 2},
      {nbPlayer: 7, blue: 4, red: 3},
      {nbPlayer: 8, blue: 5, red: 3},
      {nbPlayer: 9, blue: 6, red: 3},
      {nbPlayer: 10, blue: 6, red: 4}
    ];
  }

  get rules(): { nbPlayer: number; blue: number; red: number }[] {
    return this._rules;
  }

  set rules(value: { nbPlayer: number; blue: number; red: number }[]) {
    this._rules = value;
  }
}
