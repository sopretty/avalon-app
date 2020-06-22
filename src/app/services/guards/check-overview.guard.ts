import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as selectors from '../../store/reducers/selectors';
import { getGame } from '../../store/actions/actions';
import { State } from '../../store/reducers';

@Injectable({
  providedIn: 'root'
})
export class CheckOverviewGuard implements CanActivate {

  constructor(private _store: Store<State>, private _router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {

    return this._store.pipe(
      select(selectors.selectGameState),
      map(res => {
        if (!route.params.id) {
          this._router.navigate(['/']);
          return false;
        } else if (!res) {
          this._store.dispatch(getGame({ gameId: route.params.id }));
          return true;
        }
        return true;
      })
    );
  }

}
