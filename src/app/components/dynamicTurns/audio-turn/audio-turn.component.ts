import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import { GenericTurnComponent } from '../generic-turn/generic-turn.component';
import { State } from '../../../store/reducers';
import * as actions from '../../../store/actions/actions';
import * as selectors from '../../../store/reducers/selectors';

@Component({
  selector: 'app-audio-turn',
  templateUrl: './audio-turn.component.html',
  styleUrls: ['./audio-turn.component.scss']
})
export class AudioTurnComponent extends GenericTurnComponent implements OnInit {

  private source: any;
  private gameId: string;
  private audio: any;

  constructor(private _store: Store<State>, private route: ActivatedRoute) {
    super(_store);
  }

  ngOnInit() {

    this._store.pipe(select(selectors.selectGameId)).subscribe(id => {
      this.gameId = id;
      console.log('dispatch audio');
      this._store.dispatch(actions.getAudio({ gameId: this.gameId }));
    });

    this._store.pipe(select(selectors.selectAudio)).subscribe(audio => {
      console.log('get audio', audio);
      this.audio = audio;
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
    });

  }

  playAudio() {
    if(this.source){
      this.source.start();
    }
  }

  playGame() {
    this.finished();
  }

}
