import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingComponent} from './landing/landing.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RolesComponent} from './roles/roles.component';
import {GameComponent} from './game/game.component';
import {AudioComponent} from './audio/audio.component';

const routes: Routes = [
  {path: '', component: LandingComponent },
  {path: 'dashboard', component: DashboardComponent},
  {path: 'roles', component: RolesComponent},
  {path: 'audio', component: AudioComponent},
  {path: 'games/:id', component: GameComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
