import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ConfigService} from '../services/config/config.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private _minNumberPlayer = 5;
  private _maxNumberPlayer = 10;

  private _numberChoosed: number;

  constructor(private router: Router, private _configService: ConfigService) {
  }

  ngOnInit() {
    this._numberChoosed = this.minNumberPlayer;
  }

  numberPlayerChoosed(value: string): void {
    this._numberChoosed = Number(value);
  }

  goToRoles(): void {
    this._configService.nbPlayer = this.numberChoosed;
    this.router.navigate(['roles']);
  }

  createArray(n: number): number[] {
    return new Array(n);
  }


  get minNumberPlayer(): number {
    return this._minNumberPlayer;
  }

  set minNumberPlayer(value: number) {
    this._minNumberPlayer = value;
  }

  get maxNumberPlayer(): number {
    return this._maxNumberPlayer;
  }

  set maxNumberPlayer(value: number) {
    this._maxNumberPlayer = value;
  }

  get numberChoosed(): number {
    return this._numberChoosed;
  }

  set numberChoosed(value: number) {
    this._numberChoosed = value;
  }
}
