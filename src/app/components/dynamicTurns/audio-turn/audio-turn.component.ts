import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';

import {GenericTurnComponent} from '../generic-turn/generic-turn.component';
import {GameService} from '../../../services/game/game.service';
import * as selectors from '../../../store/reducers/selectors';
import {State} from '../../../store/reducers';

@Component({
  selector: 'app-audio-turn',
  templateUrl: './audio-turn.component.html',
  styleUrls: ['./audio-turn.component.scss']
})
export class AudioTurnComponent extends GenericTurnComponent implements OnInit {

  source: any;
  gameId: string;

  constructor(private _store: Store<State>, private _gameService: GameService, private route: ActivatedRoute) {
    super(_store);
    this._store.pipe(select(selectors.selectGameState)).subscribe(game => {
      this.gameId = game.id;
    });
  }

  ngOnInit() {
    if (this.gameId) {
      const audioCtx = new AudioContext();
      this.source = audioCtx.createBufferSource();

      this._gameService.getAudio(this.gameId)
        .subscribe(_ => {
            audioCtx.decodeAudioData(_, (buffer) => {
                this.source.buffer = buffer;
                this.source.connect(audioCtx.destination);
              },
              () => {
                console.log('decodeAudioError');
              });
          }
        );
    }

  }

  playAudio() {
    this.source.start();
  }

  playGame() {
    this.finished();
  }

}
