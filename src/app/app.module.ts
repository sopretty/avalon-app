import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LandingComponent} from './landing/landing.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RolesComponent} from './roles/roles.component';
import {GameComponent} from './game/game.component';
import {AudioComponent} from './audio/audio.component';
import {metaReducers, reducers} from './store/reducers';
import {GenericTurnComponent} from './dynamicTurns/generic-turn/generic-turn.component';
import {RoleTurnComponent} from './dynamicTurns/role-turn/role-turn.component';
import {EffectsModule} from '@ngrx/effects';
import {GameEffects} from './store/effects/game.effects';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    DashboardComponent,
    RolesComponent,
    GameComponent,
    AudioComponent,
    GenericTurnComponent,
    RoleTurnComponent
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
  bootstrap: [AppComponent]
})
export class AppModule {
}
