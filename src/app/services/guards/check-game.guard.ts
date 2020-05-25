import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import * as selectors from '../../store/reducers/selectors';
import { State } from '../../store/reducers';

@Injectable({
  providedIn: 'root'
})
export class CheckGameGuard implements CanActivate {

  constructor(private _store: Store<State>, private _router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    
    return this._store.pipe(
      select(selectors.selectGameState),
      map(game => !!game && !!game.id),
      tap(res => {
        if (!res) {
          this._router.navigate(['/']);
        }
      })
    );
  }

}
