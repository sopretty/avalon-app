import {Component, OnInit} from '@angular/core';
import {GenericTurnComponent} from '../generic-turn/generic-turn.component';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-audio-turn',
  templateUrl: './audio-turn.component.html',
  styleUrls: ['./audio-turn.component.scss']
})
export class AudioTurnComponent extends GenericTurnComponent implements OnInit {

  audio: any;
  endAudio: boolean;

  constructor(store: Store<{ game: { events: [] } }>) {
    super(store);
    this.endAudio = false;
  }

  ngOnInit() {
    this.audio = new Audio();
    // this.audio-turn.src = `../../assets/audio-turn/avalon${
    //  this.cleanRoles(this.configService.roles).length > 0 ?
    //    `_${this.cleanRoles(this.configService.roles).join('_')}` : ''}.mp3`;
    this.audio.src = '../../../assets/audio/test.mp3';
    this.audio.load();
    this.audio.onended = () => this.endAudio = true;
  }

  playAudio() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.audio.play();
  }

  stopAudio() {
    this.audio.pause();
  }

  playGame() {
    this.finished();
  }

}
