import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Game } from '../shared/game.type';
import { GameSaveService } from '../shared/game.save.service'

@Component({
    selector: 'game-login',
    templateUrl: './game.login.component.html',
    providers: [GameSaveService],
    inputs: ["_game"]

})
export class GameLoginComponent implements OnInit {

    private _game: Game;
    
    /*constructor(private _gameLoginService: GameLoginService,
        private _router: Router, private _routeParams: ActivatedRoute) {
    }*/

    constructor(private _service: GameSaveService,
        private _router: Router) {
        
    }
    
    ngOnInit(): any {
        this._game = new Game();
    }

    onSubmit() {

        console.log("Loggin in: ");
        console.log(this._game);
        //this._game.move1 = this._game.move1||"selecione";
        //this._game.move2 = this._game.move2 ||"selecione";
        //console.log("Move 1 before save " + (this._game.move1 || "nada"));
        this._service.save('CURRENT_PLAYERS', this._game);
        
        let poco: Game = this._service.read<Game>('CURRENT_PLAYERS');
        //convert poco to type T
        this._game = this._game.getFromPOCO(poco);
        console.log("Logged in: ");
        console.log(this._game.player1Name + " vs " + this._game.player2Name);
        //console.log("Move 1 saved previously " + (this._game.move1 || "nada"));
        
        this._router.navigate(['round']);
    }
}
