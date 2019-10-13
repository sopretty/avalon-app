import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';

import {GenericTurnComponent} from '../generic-turn/generic-turn.component';
import {GameService} from '../../../services/game/game.service';
import {State} from '../../../store/reducers';
import * as actions from '../../../store/actions/actions';

@Component({
  selector: 'app-audio-turn',
  templateUrl: './audio-turn.component.html',
  styleUrls: ['./audio-turn.component.scss']
})
export class AudioTurnComponent extends GenericTurnComponent implements OnInit {

  private source: any;
  private gameId: string;
  private audio: any;

  constructor(private _store: Store<State>, private _gameService: GameService, private route: ActivatedRoute) {
    super(_store);
  }

  ngOnInit() {
    this._store.dispatch(actions.getAudio());
    this._store.pipe(select('game')).subscribe(state => {
      this.gameId = state.game.id;
      this.audio = state.audio;
    });

    if (this.gameId && this.audio) {
      const audioCtx = new AudioContext();
      this.source = audioCtx.createBufferSource();

      audioCtx.decodeAudioData(this.audio, (buffer) => {
          this.source.buffer = buffer;
          this.source.connect(audioCtx.destination);
        },
        () => {
          console.log('decodeAudioError');
        });
    }

  }

  playAudio() {
    this.source.start();
  }

  playGame() {
    this.finished();
  }

}
