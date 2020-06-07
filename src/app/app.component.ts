import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import { getRules } from './store/actions/actions';
import { State } from './store/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private store: Store<State>,
    private translate: TranslateService) {
      // this language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang('en');

       // the lang to use, if the lang isn't available, it will use the current loader to get them
      translate.use('en');
  }

  ngOnInit(): void {
    this.store.dispatch(getRules());
  }
}
