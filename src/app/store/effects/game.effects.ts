import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { catchError, map, mapTo, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { GameService } from '../../services/game/game.service';
import { ConfigService } from '../../services/config/config.service';
import * as actions from '../actions/actions';
import { addEvents, onError, onLoad, onSuccess } from '../actions/actions';
import { consumeEvents } from '../actions/actions';

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

  createQuest$ = createEffect(() => this.actions$.pipe(
    ofType(actions.createQuest),
    switchMap(({ gameId, questId, players }) =>
      this.gameService.createQuest(gameId, questId, players.map(player => player.id)).pipe(
        mapTo({ players, questId, gameId }),
      )),
    switchMap(({ players, questId, gameId }) => ([
      onSuccess(),
      addEvents({
        events: players.map(player => ({ type: 'app-vote-turn', state: { player, questId, gameId } }))
      }), addEvents({ events: [{ type: 'app-end-turn', state: { questId, gameId } }] })])
    ),
    catchError(() => of(onError()))
    )
  );

  setVote = createEffect(() => this.actions$.pipe(
    ofType(actions.setVote),
    switchMap(({ gameId, questId, playerId, vote }) =>
      this.gameService.setVote(gameId, questId, playerId, vote).pipe(
        mapTo({ questId, playerId }),
      )),
    switchMap(() => ([
        onSuccess(),
        consumeEvents()
      ])
    ),
    catchError(() => of(onError(), consumeEvents()))
  ));

  createQuestLoading$ = createEffect(() => this.actions$.pipe(
    ofType(actions.createQuest),
    map(() => onLoad())
  ));

  questUnsend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.questUnsend),
      switchMap(({ gameId }) => this.gameService.questUnsend(gameId)),
      map(board => actions.setBoard({ board }))
    ));

  getQuest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getQuest),
      switchMap(({ gameId, questId }) =>
        this.gameService.getQuest(gameId, questId).pipe(
          map(questResult => ({
            quest: questResult,
            questId
          })))),
      map(({ quest, questId }) => actions.setQuest({ quest, questId }))
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
