import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { withLatestFrom } from 'rxjs/operators';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { Store } from '@ngrx/store';

import { State } from '../../store/reducers';
import { selectRules } from '../../store/reducers/selectors';
import { Rules } from '../../types';
import { ConfigService } from '../../services/config/config.service';

export function forbiddenNameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return (new Set(control.value)).size !== control.value.length ? { forbiddenName: { value: control.value } } : null;
  };
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  host: { class: 'component-container' }
})
export class DashboardComponent implements OnInit {

  minNumberPlayer: number;
  maxNumberPlayer: number;
  numberChoosed: number;
  players: { name: string, avatar: number }[];
  form: FormGroup;
  loading: boolean;
  rules: Rules;
  defaultNameTranslation = 'DefaultName';
  randomAvatarId: number;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store<State>,
    private configService: ConfigService,
    private translateService: TranslateService,
  ) {
    this.loading = true;

  }

  ngOnInit() {
    this.store.select(selectRules).pipe(withLatestFrom(this.translateService.get('DASHBOARD.defaultName')))
      .subscribe(([rules, translation]) => {
          this.defaultNameTranslation = translation;
          if (rules) {
            const rulesKeys = Object.keys(rules);
            this.minNumberPlayer = Number(rulesKeys[0]);
            this.maxNumberPlayer = Number(rulesKeys[rulesKeys.length - 1]);
            this.loading = false;
            this.rules = rules;
            this.randomAvatarId = Math.floor(Math.random() * this.minNumberPlayer) + 1;
            this.players = this.getPlayers(translation);
            this.numberChoosed = this.players.length;
            this.form = this.formBuilder.group({
              players: new FormArray([], [forbiddenNameValidator()]),
              nbPlayers: new FormControl(this.minNumberPlayer),
            });
            this.addPlayerNames();
            this.onFormChange();
          }
        }
      );

  }

  addPlayerNames(): void {
    this.players.forEach((player) => {
      this.playersForm.push(new FormControl(player.name));
    });
  }

  submit(): void {
    this.configService.players = this.playersForm.controls.map((form, idx) => ({
      name: form.value,
      avatar: this.players[idx].avatar
    }));
    localStorage.setItem('players', JSON.stringify(this.configService.players));
    this.router.navigate(['roles']);
  }

  createArray(n: number): any[] {
    if (n) {
      return new Array(n).fill(null);
    }
  }

  get isNameTooLongOrTooShort(): boolean {
    return !this.form.get('players').errors?.forbiddenName && this.form.invalid;
  }

  get isNameUnique(): boolean {
    return !this.form.get('players').errors?.forbiddenName;
  }

  onFormChange(): void {
    this.form.get('nbPlayers').valueChanges
      .subscribe(newPlayerNumber => {
        if (this.playersForm.length < newPlayerNumber) {
          this.createArray(newPlayerNumber - this.playersForm.length).forEach(() => {

              this.playersForm.push(new FormControl(`${this.defaultNameTranslation} ${this.playersForm.length + 1}`));
              this.players.push({
                name: `${this.defaultNameTranslation} ${this.playersForm.length + 1}`,
                avatar: (this.randomAvatarId + this.playersForm.length - 1) % this.maxNumberPlayer + 1
              });
            }
          );
        }

        if (this.playersForm.length > newPlayerNumber) {
          const previouslength = this.playersForm.length;
          this.createArray(this.playersForm.length - newPlayerNumber).forEach((_, i) => {
            this.playersForm.removeAt(previouslength - i - 1);
            this.players = this.players.slice(0, previouslength - i - 1);
          });
        }
      });
  }

  get playersForm(): FormArray {
    return this.form.get('players') as FormArray;
  }

  getPlayers(translation: string): any[] {
    if (localStorage.getItem('players')) {
      return JSON.parse(localStorage.getItem('players'));
    }


    return Array.from(new Array(this.minNumberPlayer), (_p, index) => ({
      name: `${translation} ${index + 1}`,
      avatar: (this.randomAvatarId + index) % this.maxNumberPlayer + 1
    }));
  }

  getPlayerAvatarImg(index: number): string {
    if (!!this.players && this.players.length && !!this.players[index]) {
      return `/assets/avatars/${this.players[index].avatar}.png`;
    }
  }
}
