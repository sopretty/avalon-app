import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createGame } from '../../store/actions/actions';
import { State } from '../../store/reducers';
import { ConfigService } from '../../services/config/config.service';
import { selectRules } from '../../store/reducers/selectors';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  host: { class: 'component-container' }
})
export class RolesComponent implements OnInit {

  selected: { red: number, blue: number };
  allowed: { red: number, blue: number };
  roles: { descriptionKey: string, characters: { asset: string, name: string, team: string, description: string }[] }[] = [
    {

      descriptionKey: 'ROLES.merlin',
      characters: [{ asset: '/assets/characters/merlin.png', name: 'merlin', team: 'blue', description: 'ROLES.merlinDescription' }],
    },
    {
      descriptionKey: 'ROLES.mordred',
      characters: [{ asset: '/assets/characters/mordred.png', name: 'mordred', team: 'red', description: 'ROLES.mordredDescription' }],
    },
    {

      descriptionKey: 'ROLES.morganaAndPerceval',
      characters: [{ asset: '/assets/characters/morgana.png', name: 'morgan', team: 'red', description: 'ROLES.morganaDescription' }, {
        asset: '/assets/characters/perceval.png',
        name: 'perceval',
        team: 'blue', description: 'ROLES.percevalDescription'
      }
      ],
    },
    {
      descriptionKey: 'ROLES.oberon',
      characters: [{ asset: '/assets/characters/oberon.png', name: 'oberon', team: 'red', description: 'ROLES.oberonDescription' }],
    },
  ];
  form: FormGroup;
  loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<State>,
    private configService: ConfigService) {
    this.loading = false;
  }

  ngOnInit() {
    this.store.select(selectRules).subscribe(rules => {
      if (rules) {
        const ruleKey = Object.keys(rules).find((nbPlayer) => Number(nbPlayer) === this.configService.players.length);
        if (ruleKey) {
          this.allowed = { blue: rules[ruleKey].blue, red: rules[ruleKey].red };
        }

      }
    });
    this.selected = { red: 0, blue: 0 };
    this.form = this.formBuilder.group({
      roles: new FormArray([], this.redBlueValidator()),
    });
    this.addCheckRoles();
  }

  redBlueValidator() {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalTeam = this.characterValidator(formArray);
      return totalTeam.blue > this.allowed.blue || totalTeam.red > this.allowed.red ? { required: true } : null;
    };
    return validator;
  }

  getCharacterTeam(index: number): { blue: number, red: number } {
    return this.roles[index].characters.reduce(
      (accRole, currRole) => {
        return { blue: accRole.blue + (currRole.team === 'blue' ? 1 : 0), red: accRole.red + (currRole.team === 'red' ? 1 : 0) };
      }
      , { blue: 0, red: 0 });
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
          return { blue: acc.blue + charTeam.blue, red: acc.red + charTeam.red };
        }
        return acc;
      }, { blue: 0, red: 0 });
  }

  submit(): void {
    this.loading = true;
    this.configService.roles = this.rolesForm.controls.reduce(
      (acc, curr, index) =>
        acc.concat((!!curr.value ? this.roles[index].characters : []))
      , []);
    this.store.dispatch(createGame());
  }

  get rolesForm(): FormArray {
    return this.form.get('roles') as FormArray;
  }

  goBack(): void {
    this.router.navigate(['dashboard']);
  }

}
