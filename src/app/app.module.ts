import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LandingComponent} from './landing/landing.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RolesComponent} from './roles/roles.component';
import {GameComponent} from './game/game.component';
import {AudioTurnComponent} from './dynamicTurns/audio-turn/audio-turn.component';
import {metaReducers, reducers} from './store/reducers';
import {GenericTurnComponent} from './dynamicTurns/generic-turn/generic-turn.component';
import {RoleTurnComponent} from './dynamicTurns/role-turn/role-turn.component';
import {GameEffects} from './store/effects/game.effects';
import {TurnDirective} from './dynamicTurns/turn.directive';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    DashboardComponent,
    RolesComponent,
    GameComponent,
    AudioTurnComponent,
    RoleTurnComponent,
    TurnDirective,
    GenericTurnComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([GameEffects])
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [RoleTurnComponent, GenericTurnComponent, AudioTurnComponent],
})
export class AppModule {
}
