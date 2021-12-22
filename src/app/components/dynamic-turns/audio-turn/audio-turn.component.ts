import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { GenericTurnComponent } from '../generic-turn/generic-turn.component';
import { State } from '../../../store/reducers';
import * as actions from '../../../store/actions/actions';
import * as selectors from '../../../store/reducers/selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-audio-turn',
  templateUrl: './audio-turn.component.html',
  styleUrls: ['./audio-turn.component.scss'],
  host: { class: 'component-container dynamic-turns' }
})
export class AudioTurnComponent extends GenericTurnComponent implements OnInit, OnDestroy {


  private gameId: string;
  audioContext: AudioContext;
  buffer: AudioBuffer;
  loading: boolean;
  playing: boolean;
  pausedAt = 0;
  startedAt: number;
  source: AudioBufferSourceNode;

  constructor(private router: Router, private _store: Store<State>) {
    super(_store);
    this.loading = true;
    this.playing = false;
    const contextClass = (window.AudioContext ||
      window.webkitAudioContext ||
      window.mozAudioContext ||
      window.oAudioContext ||
      window.msAudioContext);
    if (contextClass) {
      // Web Audio API is available.
      this.audioContext = new contextClass();
    } else {
      throw new Error('No audio context');
    }
  }

  ngOnInit() {
    this._store.pipe(select(selectors.selectGameId)).subscribe(id => {
      this.gameId = id;
      this._store.dispatch(actions.getAudio({ gameId: this.gameId }));
    });

    this._store.pipe(select(selectors.selectAudio)).subscribe(audio => {
      if (this.gameId && audio) {
        this.audioContext.decodeAudioData(audio, (buffer) => {
            this.buffer = buffer;
          },
          (err) => {
            console.log(err, 'decodeAudioError');
          });
        this.loading = false;
      }
    });

  }

  ngOnDestroy(): void {
    this.source = undefined;
    this.audioContext = undefined;
  }


  pauseAudio() {
    if (this.playing && this.source) {
      this.stopAudio();
    } else {
      this.playing = true;
      this.playAudio();
    }
  }

  playAudio() {
    this.source = this.audioContext.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.connect(this.audioContext.destination);
    this.startedAt = Date.now();
    this.source.start(0, this.pausedAt ? this.pausedAt / 1000 : 0);
    this.source.addEventListener('ended', () => {
      if (this.playing) {
        this.startedAt = 0;
        this.pausedAt = 0;
        this.playing = false;
      }
    });
  }

  stopAudio() {
    this.playing = false;
    this.pausedAt += Date.now() - this.startedAt;
    if (this.source) {
      try {
        this.source.stop();
      } catch (e) {
        console.log('Error when stopping audio', e);
      }
    }
  }

  goBack(): void {
    this.router.navigate(['roles']);
  }

  playGame() {
    this.stopAudio();
    this.finished();
  }

}
