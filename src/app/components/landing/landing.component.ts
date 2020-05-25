import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  host: { class: 'component-container' }
})
export class LandingComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  public launchGame() {
    this.router.navigate(['dashboard']);
  }
}
