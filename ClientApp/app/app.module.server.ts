import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { sharedConfig } from './app.module.shared';
import { FormsModule } from '@angular/forms';

import { GameScoreService } from './components/shared/game.score.service';
import { GameSaveService } from './components/shared/game.save.service';

@NgModule({
    bootstrap: sharedConfig.bootstrap,
    declarations: sharedConfig.declarations,
    imports: [
        ServerModule,
        FormsModule,
        ...sharedConfig.imports
    ],
    providers: [
        GameScoreService,
        GameSaveService
        //TODO services go here
    ]
})
export class AppModule {
}
