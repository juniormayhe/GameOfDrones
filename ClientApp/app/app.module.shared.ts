import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';

import { GameLoginComponent } from './components/game/game.login.component';
import { GameRoundComponent } from './components/game/game.round.component';
import { GameScoreComponent } from './components/game/game.score.component';
import { GameWinnerComponent } from './components/game/game.winner.component';
import { GameSetupComponent} from './components/game/game.setup.component';
import { FooterComponent } from './components/shared/footer/footer.component';



export const sharedConfig: NgModule = {
    bootstrap: [ AppComponent],
    declarations: [
        AppComponent,
        HomeComponent,
        GameLoginComponent,
        GameRoundComponent,
        GameScoreComponent,
        GameWinnerComponent,
        GameSetupComponent,
        FooterComponent
    ],
    imports: [
        
        RouterModule.forRoot([
            
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: GameLoginComponent },
            { path: 'round', component: GameRoundComponent },
            { path: 'score', component: GameScoreComponent },
            { path: 'winner', component: GameWinnerComponent },
            { path: 'setup', component: GameSetupComponent },

            { path: '**', redirectTo: 'game' }
            
            
        ])
    ]
};
