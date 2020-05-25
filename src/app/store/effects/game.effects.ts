import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';

import { GameService } from '../../services/game/game.service';
import { ConfigService } from '../../services/config/config.service';
import * as actions from '../actions/actions';

@Injectable()
export class GameEffects {

  createGame$ = createEffect(() => this.actions$
    .pipe(
      ofType(actions.createGame),
      switchMap(() => this.gameService.createGame({
          names: this.configService.players.map(_ => _.name),
          roles: this.configService.roles.map(_ => _.name)
        })
          .pipe(
            tap((game: any) => {
              if (game.id) {
                this.router.navigate(['/games', game.id]);
              }
            }),
            switchMap(game => [
                actions.createGameSuccess(game),
                actions.addEvents({
                  events: game.players.map(player => ({ type: 'app-role-turn', state: player }))
                }),
                actions.addEvents({
                  events: [{
                    type: 'app-audio-turn',
                  }]
                })
              ]
            ),
          )
      ))
  );

  getAudio$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.getAudio),
        switchMap(({ gameId }) => this.gameService.getAudio(gameId)),
        map(audio => actions.setAudio({ audio }))
      )
  );

  getBoard$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.getBoard),
        switchMap(({ gameId }) => this.gameService.getBoard(gameId)),
        map(board => actions.setBoard({ board }))
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
