import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingComponent} from './components/landing/landing.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {RolesComponent} from './components/roles/roles.component';
import {GameComponent} from './components/game/game.component';
import {CheckGameGuard} from './services/guards/check-game.guard';
import {CheckRolesGuard} from './services/guards/check-roles.guard';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'roles', component: RolesComponent, canActivate: [CheckRolesGuard]},
  {path: 'games/:id', component: GameComponent, canActivate: [CheckGameGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
