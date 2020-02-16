import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RolesComponent } from './components/roles/roles.component';
import { GameComponent } from './components/game/game.component';
import { AudioTurnComponent } from './components/dynamicTurns/audio-turn/audio-turn.component';
import * as reducers from './store/reducers';
import { GenericTurnComponent } from './components/dynamicTurns/generic-turn/generic-turn.component';
import { RoleTurnComponent } from './components/dynamicTurns/role-turn/role-turn.component';
import { GameEffects } from './store/effects/game.effects';
import { TurnDirective } from './components/dynamicTurns/turn.directive';
import { DialogComponent } from './components/game/dialog/dialog.component';
import { MatCheckboxModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    GenericTurnComponent,
    DialogComponent
  ],
  imports: [
    // Material
    MatDialogModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot({ game: reducers.reducer }),
    EffectsModule.forRoot([GameEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [RoleTurnComponent, GenericTurnComponent, AudioTurnComponent, DialogComponent],
})
export class AppModule {
}
