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
import { AudioTurnComponent } from './components/dynamic-turns/audio-turn/audio-turn.component';
import * as reducers from './store/reducers';
import { GenericTurnComponent } from './components/dynamic-turns/generic-turn/generic-turn.component';
import { RoleTurnComponent } from './components/dynamic-turns/role-turn/role-turn.component';
import { GameEffects } from './store/effects/game.effects';
import { DialogComponent } from './components/game/dialog/dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VoteTurnComponent } from './components/dynamic-turns/vote-turn/vote-turn.component';
import { EndTurnComponent } from './components/dynamic-turns/end-turn/end-turn.component';
import { metaReducers } from './store/reducers/meta-reducer';
import { EndGameComponent } from './components/end-game/end-game.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    DashboardComponent,
    RolesComponent,
    GameComponent,
    AudioTurnComponent,
    RoleTurnComponent,
    GenericTurnComponent,
    DialogComponent,
    VoteTurnComponent,
    EndTurnComponent,
    EndGameComponent,
    ButtonComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot({ game: reducers.reducer }, { metaReducers }),
    EffectsModule.forRoot([GameEffects]),
    // Material
    MatDialogModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [RoleTurnComponent, GenericTurnComponent, AudioTurnComponent, VoteTurnComponent, DialogComponent, EndTurnComponent],
})
export class AppModule {
}
