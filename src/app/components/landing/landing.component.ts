import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  host: { class: 'component-container' }
})
export class LandingComponent implements OnInit {

  nbFireflies: number;

  constructor(private router: Router) {
    this.nbFireflies = 15;
  }

  ngOnInit() {
  }

  get fireflies(): Array<number>{
    return Array.from(Array(this.nbFireflies).keys()) ;
  }

  public launchGame() {
    this.router.navigate(['dashboard']);
  }
}
