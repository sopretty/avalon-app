import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {ConfigService} from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class CheckRolesGuard implements CanActivate {

  constructor(private _configService: ConfigService, private _router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {
    if (this._configService.players.length > 0) {
      return true;
    }
    this._router.navigate(['/']);
    return false;
  }

}
