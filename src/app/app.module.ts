import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

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
import { VoteTurnComponent } from './components/dynamic-turns/vote-turn/vote-turn.component';
import { EndTurnComponent } from './components/dynamic-turns/end-turn/end-turn.component';
import { metaReducers } from './store/reducers/meta-reducer';
import { EndGameComponent } from './components/end-game/end-game.component';
import { ButtonComponent } from './button/button.component';
import { OverviewComponent } from './components/overview/overview.component';
import { RoleDialogComponent } from './components/game/role-dialog/role-dialog.component';
import { QuestDialogComponent } from './components/game/quest-dialog/quest-dialog.component';
import { RevealComponent } from './components/reveal/reveal.component';


// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, '../assets/i18n/', '.json');
}

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
    ButtonComponent,
    OverviewComponent,
    RoleDialogComponent,
    QuestDialogComponent,
    RevealComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot({ game: reducers.reducer }, { metaReducers }),
    EffectsModule.forRoot([GameEffects]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    // Material
    MatDialogModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatChipsModule,
    MatRippleModule,
    MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
