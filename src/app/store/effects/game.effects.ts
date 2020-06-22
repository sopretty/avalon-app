import {
  onLoadSend,
  onLoadUnsend,
  onErrorUnsend,
  onErrorSend,
  onSuccessSend,
  onLoadVote,
  onSuccessVote,
  onErrorVote
} from './../actions/actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { catchError, map, mapTo, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { GameService } from '../../services/game/game.service';
import * as actions from '../actions/actions';
import { addEvents, onError, onLoad, onSuccess } from '../actions/actions';
import { consumeEvents } from '../actions/actions';
import { ConfigService } from '../../services/config/config.service';

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
                actions.setGame(game),
                actions.addEvents({
                  events: game.players.slice().reverse().map(player => ({ type: 'app-role-turn', state: player }))
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


  getGameLoading$ = createEffect(() => this.actions$.pipe(
    ofType(actions.getGame),
    map(() => onLoad())
  ));


  getGame$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.getGame),
        switchMap(({ gameId }) => this.gameService.getGame(gameId)),
        switchMap(game => [actions.setGame(game), actions.onSuccess()]),
        catchError(() => of(actions.onError()))
      )
  );

  createQuestLoading$ = createEffect(() => this.actions$.pipe(
    ofType(actions.createQuest),
    map(() => onLoadSend())
  ));

  createQuest$ = createEffect(() => this.actions$.pipe(
    ofType(actions.createQuest),
    switchMap(({ gameId, questId, players }) =>
      this.gameService.createQuest(gameId, questId, players.map(player => player.id)).pipe(
        mapTo({ players, questId, gameId }),
      )),
    switchMap(({ players, questId, gameId }) => ([
        onSuccessSend(),
        addEvents({
          events: players.slice().reverse().map(player => ({ type: 'app-vote-turn', state: { player, questId, gameId } }))
        }), addEvents({ events: [{ type: 'app-end-turn', state: { questId, gameId } }] })
      ])
    ),
    catchError((err) => {
      console.log(err);
      return of(onErrorSend());
    })
    )
  );

  setVoteLoading$ = createEffect(() => this.actions$.pipe(
    ofType(actions.setVote),
    map(() => onLoadVote())
  ));

  setVote$ = createEffect(() => this.actions$.pipe(
    ofType(actions.setVote),
    switchMap(({ gameId, questId, playerId, vote }) =>
      this.gameService.setVote(gameId, questId, playerId, vote).pipe(
        mapTo({ questId, playerId }),
      )),
    switchMap(() => ([
        onSuccessVote(),
        onSuccess(),
        consumeEvents()
      ])
    ),
    catchError(() => of(onError(), onErrorVote(), consumeEvents()))
  ));

  questUnsendLoading$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.questUnsend),
      map(() => onLoadUnsend())
    ));

  questUnsend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.questUnsend),
      switchMap(({ gameId }) => this.gameService.questUnsend(gameId)),
      switchMap(game => [actions.setGame(game), actions.onSuccessUnsend()]),
      catchError(() => of(onErrorUnsend())),
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

  getRules$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getRules),
      switchMap(() =>
        this.configService.getRules()),
      map((rules) => actions.setRules({ rules }))
    ));

  guessMerlin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.guessMerlin),
      switchMap(({ gameId, playerId, merlinId }) =>
        this.gameService.guessMerlin(gameId, playerId, merlinId)),
      map((game) => actions.setGame(game))
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
