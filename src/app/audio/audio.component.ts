import {Component, OnInit} from '@angular/core';
import {ConfigService} from '../services/config/config.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit {

  private rolesWithoutAudio: string[];
  private replay: boolean;
  private audio: any;

  constructor(private configService: ConfigService, private router: Router) {
    this.rolesWithoutAudio = ['oberon'];
    this.replay = false;
  }

  ngOnInit() {
    this.audio = new Audio();
    this.audio.src = `../../assets/audio/avalon${
      this.cleanRoles(this.configService.roles).length > 0 ?
        `_${this.cleanRoles(this.configService.roles).join('_')}` : ''}.mp3`;
//    this.audio.src = '../../assets/audio/test.mp3';
    this.audio.load();
    this.audio.play();
    this.audio.onended = () => this.endOfAudio();
  }

  cleanRoles(rolesAdded: { name: string, team: string }[]) {
    return rolesAdded.map(role => role.name).filter(
      role => !this.rolesWithoutAudio.includes(role));
  }

  endOfAudio(): void {
    this.replay = true;
  }

  playAudioAgain() {
    this.replay = false;
    this.audio.play();
  }

  playGame() {
    this.router.navigate(['games']);
  }
}
