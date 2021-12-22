import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-audio-wave-svg',
  templateUrl: './audio-wave.component.svg',
  styleUrls: ['./audio-wave.component.scss']
})
export class AudioWaveSvgComponent {

  @Input()
  animated: boolean = false;

}


