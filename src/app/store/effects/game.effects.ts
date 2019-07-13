import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {map, switchMap, tap} from 'rxjs/operators';
import {ActionTypes, AddEvents, CreateGameSuccess} from '../actions/actions';
import {GameService} from '../../services/game/game.service';
import {ConfigService} from '../../services/config/config.service';
import {Router} from '@angular/router';

@Injectable()
export class GameEffects {

  @Effect()
  createGame$ = this.actions$
    .pipe(
      ofType(ActionTypes.CreateGame),
      switchMap(() => this.gameService.createGame({
          names: this.configService.players.map(_ => _.name),
          roles: this.configService.roles.map(_ => _.name)
        })
          .pipe(
            map(game => [new CreateGameSuccess(game),
              new AddEvents(
                {
                  events: game.players.map(player => ({type: 'app-role-turn', state: player}))
                })]
            ),
            tap((actions: any) => this.router.navigate(['/games', {id: actions[0].payload.id}]))
          )
      )
    );


  constructor(
    private actions$: Actions,
    private gameService: GameService,
    private configService: ConfigService,
    private router: Router,
  ) {
  }
}
