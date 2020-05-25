import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ConfigService} from '../../services/config/config.service';
import {FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import {Store} from '@ngrx/store';
import {createGame} from '../../store/actions/actions';
import {State} from '../../store/reducers';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  host: { class: 'component-container' }
})
export class RolesComponent implements OnInit {

  selected: { red: number, blue: number };
  allowed: { red: number, blue: number };
  roles: { description: string, characters: { name: string, team: string }[] }[] = [
    {
      description: 'Mordred (red)',
      characters: [{name: 'mordred', team: 'red'}],
    },
    {
      description: 'Morgane (red), Perceval (blue)',
      characters: [{name: 'morgan', team: 'red'}, {name: 'perceval', team: 'blue'}],
    },
    {
      description: 'Oberon (red)',
      characters: [{name: 'oberon', team: 'red'}],
    },
  ];
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<State>,
    private configService: ConfigService) {
  }

  ngOnInit() {
    this.allowed = this.configService.rules.find(config => config.nbPlayer === this.configService.players.length);
    this.selected = {red: 0, blue: 0};
    this.form = this.formBuilder.group({
      roles: new FormArray([], this.redBlueValidator()),
    });
    this.addCheckRoles();
  }

  redBlueValidator() {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalTeam = this.characterValidator(formArray);
      return totalTeam.blue > this.allowed.blue || totalTeam.red > this.allowed.red ? {required: true} : null;
    };
    return validator;
  }

  getCharacterTeam(index: number): { blue: number, red: number } {
    return this.roles[index].characters.reduce(
      (accRole, currRole) => {
        return {blue: accRole.blue + (currRole.team === 'blue' ? 1 : 0), red: accRole.red + (currRole.team === 'red' ? 1 : 0)};
      }
      , {blue: 0, red: 0});
  }

  addCheckRoles(): void {
    this.roles.forEach(() => {
      this.rolesForm.push(new FormControl(false));
    });
  }

  characterValidator(formArray: FormArray): { blue: number, red: number } {
    return formArray.controls
      .map(control => control.value)
      .reduce((acc, curr, index) => {
        if (!!curr) {
          const charTeam = this.getCharacterTeam(index);
          return {blue: acc.blue + charTeam.blue, red: acc.red + charTeam.red};
        }
        return acc;
      }, {blue: 0, red: 0});
  }

  submit(): void {
    this.configService.roles = this.rolesForm.controls.reduce(
      (acc, curr, index) =>
        acc.concat((!!curr.value ? this.roles[index].characters : []))
      , []);
    this.store.dispatch(createGame());
  }

  get rolesForm(): FormArray {
    return this.form.get('roles') as FormArray;
  }

}
