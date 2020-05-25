import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ConfigService } from '../../services/config/config.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  host: { class: 'component-container' }
})
export class DashboardComponent implements OnInit {

  minNumberPlayer = 5;
  maxNumberPlayer = 10;
  numberChoosed: number;
  players: string[];
  form: FormGroup;

  constructor(
    private router: Router,
    private configService: ConfigService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.numberChoosed = this.minNumberPlayer;
    this.players = Array.from(new Array(this.numberChoosed), (p, index) => (`DefaultName-${index + 1}`));
    this.form = this.formBuilder.group({
      players: new FormArray([]),
      nbPlayers: new FormControl(this.minNumberPlayer),
    });
    this.addPlayerNames();
    this.onFormChange();
  }

  addPlayerNames(): void {
    this.players.forEach((playerName) => {
      this.playersForm.push(new FormControl(playerName));
    });
  }

  numberPlayerChoosed(event): void {
    this.numberChoosed = Number(event.value);
  }

  submit(): void {
    this.configService.players = this.playersForm.controls.map(form => ({ name: form.value, team: null }));
    this.router.navigate(['roles']);
  }

  createArray(n: number): any[] {
    return new Array(n).fill(null);
  }

  onFormChange(): void {
    this.form.get('nbPlayers').valueChanges
      .subscribe(newPlayerNumber => {
        if (this.playersForm.length < newPlayerNumber) {
          this.createArray(newPlayerNumber - this.playersForm.length).forEach((_, i) => {
              this.playersForm.push(new FormControl(`DefaultName-${this.playersForm.length + 1}`));
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
}
