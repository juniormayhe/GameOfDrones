import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Game } from '../shared/game.type'
import { GameSaveService } from '../shared/game.save.service'

@Component({
    selector: 'game-winner',
    templateUrl: './game.winner.component.html',
    providers: [GameSaveService]
})
export class GameWinnerComponent implements OnInit {

    public _game: Game;
    

    constructor(private _service: GameSaveService,
        private _router: Router) {
        this._game = new Game();

    }
    ngOnInit(): any {

        //this._game.round = 0;
        let poco: Game = this._service.read<Game>('CURRENT_PLAYERS');
        console.log("state:");
        console.log(poco);
        this._game = this._game.getFromPOCO(poco);
        console.log("Winner is " + this._game.winner);
        
    }

    onPlayAgain() {
        //redirect to round
        this._game.reset();
        this._service.save('CURRENT_PLAYERS', this._game);
        this._router.navigate(['round']);
    }
}
