import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { State } from '../../store/reducers';
import { Store } from '@ngrx/store';
import { selectRules } from '../../store/reducers/selectors';
import { Rules } from '../../types';
import { ConfigService } from '../../services/config/config.service';
import { withLatestFrom } from 'rxjs/operators';

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
  players: string[];
  form: FormGroup;
  loading: boolean;
  rules: Rules;
  defaultNameTranslation = 'DefaultName';

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
            this.numberChoosed = this.minNumberPlayer;
            this.players = this.getPlayerNames(translation);
            this.form = this.formBuilder.group({
              players: new FormArray([]),
              nbPlayers: new FormControl(this.minNumberPlayer),
            });
            this.addPlayerNames();
            this.onFormChange();
          }
        }
      );

  }

  addPlayerNames(): void {
    this.players.forEach((playerName) => {
      this.playersForm.push(new FormControl(playerName));
    });
  }

  submit(): void {
    this.configService.players = this.playersForm.controls.map(form => ({ name: form.value, team: null }));
    localStorage.setItem('names', JSON.stringify(this.configService.players.map(player => player.name)));
    this.router.navigate(['roles']);
  }

  createArray(n: number): any[] {
    if (n) {
      return new Array(n).fill(null);
    }
  }

  onFormChange(): void {
    this.form.get('nbPlayers').valueChanges
      .subscribe(newPlayerNumber => {
        if (this.playersForm.length < newPlayerNumber) {
          this.createArray(newPlayerNumber - this.playersForm.length).forEach(() => {
              this.playersForm.push(new FormControl(`${this.defaultNameTranslation}-${this.playersForm.length + 1}`));
            }
          );
        }
        if (this.playersForm.length > newPlayerNumber) {
          const previouslength = this.playersForm.length;
          this.createArray(this.playersForm.length - newPlayerNumber).forEach((_, i) => {
            this.playersForm.removeAt(previouslength - i - 1);
          });
        }
      });
  }

  get playersForm(): FormArray {
    return this.form.get('players') as FormArray;
  }

  getPlayerNames(translation: string): any[] {
    if (localStorage.getItem('names')) {
      return JSON.parse(localStorage.getItem('names'));
    }

    return Array.from(new Array(this.numberChoosed), (p, index) => (`${translation}-${index + 1}`));
  }
}
