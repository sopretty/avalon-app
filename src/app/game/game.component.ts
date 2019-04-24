import {Component, OnInit} from '@angular/core';
import {ConfigService} from '../services/config/config.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {


  constructor(private configService: ConfigService) {
  }

  ngOnInit() {
  }
}
