import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';

import {GenericTurnComponent} from '../generic-turn/generic-turn.component';
import {GameService} from '../../services/game/game.service';

@Component({
  selector: 'app-audio-turn',
  templateUrl: './audio-turn.component.html',
  styleUrls: ['./audio-turn.component.scss']
})
export class AudioTurnComponent extends GenericTurnComponent implements OnInit {

  source: any;
  endAudio: boolean;

  constructor(store: Store<{ game: { events: [] } }>, private _gameService: GameService) {
    super(store);
    this.endAudio = false;
  }

  ngOnInit() {
    let audioCtx = new AudioContext();
    this.source = audioCtx.createBufferSource();
    this._gameService.getAudio().subscribe(_ => {

     audioCtx.decodeAudioData(_, (buffer) => {
        this.source.buffer = buffer;

        this.source.connect(audioCtx.destination);
      },
       function(e){ console.log('test'); });
      }
    );
  }

  playAudio() {
   this.source.start(0);
  }

  stopAudio() {
  }

  playGame() {
    this.finished();
  }

}
