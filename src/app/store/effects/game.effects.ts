import { of } from 'rxjs';
import { catchError, map, mapTo, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { GameService } from '../../services/game/game.service';
import { ConfigService } from '../../services/config/config.service';
import { Game } from '../../types';
import { State } from '../reducers';
import { selectGameState } from '../reducers/selectors';
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
                this.router.navigate(['/reveal', game.id]);
              }
            }),
            switchMap((game: Game) => {
                console.log('---->', this.configService.players);
                return [
                  actions.setGame(this.setGameWithAvatar(game)),
                  /*actions.addEvents({
                    events: game.players.slice().reverse().map(player => ({ type: 'app-role-turn', state: player }))
                  }),*/
                  /*  */
                ];
              }
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
    map(() => actions.onLoad())
  ));


  getGame$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.getGame),
        switchMap(({ gameId }) => this.gameService.getGame(gameId)),
        switchMap(game => [actions.setGame(this.setGameWithAvatar(game)), actions.onSuccess()]),
        catchError(() => of(actions.onError()))
      )
  );

  createQuestLoading$ = createEffect(() => this.actions$.pipe(
    ofType(actions.createQuest),
    map(() => actions.onLoadSend())
  ));

  createQuest$ = createEffect(() => this.actions$.pipe(
    ofType(actions.createQuest),
    switchMap(({ gameId, questId, players }) =>
      this.gameService.createQuest(gameId, questId, players.map(player => player.id)).pipe(
        mapTo({ players, questId, gameId }),
      )),
    switchMap(({ players, questId, gameId }) => ([
      actions.onSuccessSend(),
      actions.addEvents({
          events: players.slice().reverse().map(player => ({ type: 'app-vote-turn', state: { player, questId, gameId } }))
      }), actions.addEvents({ events: [{ type: 'app-end-turn', state: { questId, gameId } }] })
      ])
    ),
    catchError((err) => {
      console.log(err);
      return of(actions.onErrorSend());
    })
    )
  );

  setVoteLoading$ = createEffect(() => this.actions$.pipe(
    ofType(actions.setVote),
    map(() => actions.onLoadVote())
  ));

  setVote$ = createEffect(() => this.actions$.pipe(
    ofType(actions.setVote),
    switchMap(({ gameId, questId, playerId, vote }) =>
      this.gameService.setVote(gameId, questId, playerId, vote).pipe(
        mapTo({ questId, playerId }),
      )),
    switchMap(() => ([
      actions.onSuccessVote(),
      actions.onSuccess(),
      actions.consumeEvents()
      ])
    ),
    catchError(() => of(actions.onError(), actions.onErrorVote(), actions.consumeEvents()))
  ));

  questUnsendLoading$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.questUnsend),
      map(() => actions.onLoadUnsend())
    ));

  questUnsend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.questUnsend),
      switchMap(({ gameId }) => this.gameService.questUnsend(gameId)),
      switchMap(game => [actions.setGame(this.setGameWithAvatar(game)), actions.onSuccessUnsend()]),
      catchError(() => of(actions.onErrorUnsend())),
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
      map((game) => actions.setGame(this.setGameWithAvatar(game)))
    )
  );

  startAudioTurn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.startAudioTurn),
      withLatestFrom(this.store.select(selectGameState)),
      tap(([_action, game]) => {
        this.router.navigate(['/games', game.id]);
      }),
      switchMap(() => [actions.addEvents({
        events: [{
          type: 'app-audio-turn',
        }]
      })])
    )
  );

  // TODO should be store in the db
  setGameWithAvatar(game: Game): Game {
    const players = JSON.parse(localStorage.getItem('players'));
    return {
      ...game,
      players: game.players.map((player, idx) => ({
        ...player,
        avatar: (players || this.configService.players).find(p => p.name === player.name)?.avatar ||
          idx + 1
      }))
    };
  }

  constructor(
    private actions$: Actions,
    private gameService: GameService,
    private configService: ConfigService,
    private router: Router,
    private store: Store<State>
  ) {
  }
}
