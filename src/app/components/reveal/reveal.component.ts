import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../../store/reducers';
import { selectRules } from '../../store/reducers/selectors';

@Component({
  selector: 'app-reveal',
  templateUrl: './reveal.component.html',
  styleUrls: ['./reveal.component.scss'],
  host: { class: 'component-container' }
})
export class RevealComponent implements OnInit {

  loading: boolean;

  constructor(private router: Router,
              private store: Store<State>) {
    this.loading = false;
  }

  ngOnInit(): void {
    this.store.select(selectRules).subscribe(rules => {
      console.log(rules);
    });
  }

  goBack(): void {
    this.router.navigate(['roles']);
  }

  goNext(): void {
    this.router.navigate(['games']);
  }

}
